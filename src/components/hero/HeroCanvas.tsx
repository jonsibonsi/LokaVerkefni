import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ChevronDown } from "lucide-react";
import styles from "./HeroCanvas.module.css";

// Frames fyrir desktop (1:1).

const desktopFrameModules = import.meta.glob(
  "../../assets/scroll-animation/square/*.webp",
  { eager: true, query: "?url", import: "default" },
);
const desktopFrameUrls: string[] = (
  Object.entries(desktopFrameModules) as [string, string][]
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, url]) => url);

// Frames fyrir Mobile (3:5).

const tallFrameModules = import.meta.glob(
  "../../assets/scroll-animation/tall/*.webp",
  { eager: true, query: "?url", import: "default" },
);
const tallFrameUrls: string[] = (
  Object.entries(tallFrameModules) as [string, string][]
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, url]) => url);

type Config = {
  frameUrls: string[];
  canvasWidth: number;
  canvasHeight: number;
  segments: { startFrame: number; endFrame: number; duration?: number }[];
};

const desktopConfig: Config = {
  frameUrls: desktopFrameUrls,
  canvasWidth: 1440,
  canvasHeight: 1440,
  segments: [
    { startFrame: 0, endFrame: 72 }, // ground → overhead view
    { startFrame: 73, endFrame: 146 }, // lokið opnast
    { startFrame: 147, endFrame: 185, duration: 0.7 }, // matur flýgur úr frame
  ],
};

const tallConfig: Config = {
  frameUrls: tallFrameUrls,
  canvasWidth: 1080,
  canvasHeight: 1800,
  segments: [
    { startFrame: 0, endFrame: 71 },
    { startFrame: 72, endFrame: 144 },
  ],
};

const DEFAULT_PLAYBACK_DURATION = 1.2;
const COOLDOWN_MS = 250;

type HeroCanvasProps = {
  isWideViewport?: boolean;
  isExited?: boolean;
  onSegmentChange?: (segment: number) => void;
  onExpandChange?: (expanded: boolean) => void;
  onExitChange?: (exiting: boolean) => void;
};

function HeroCanvas({
  isWideViewport = true,
  isExited = false,
  onSegmentChange,
  onExpandChange,
  onExitChange,
}: HeroCanvasProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Exit-staða fyrir wheel-handler.
  const isExitedRef = useRef(false);

  // Exit timeline fyrir canvas.
  const exitTimelineRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const config = isWideViewport ? desktopConfig : tallConfig;
      const { frameUrls, canvasWidth, canvasHeight, segments } = config;

      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const ctx = canvas.getContext("2d", {
        alpha: false,
        desynchronized: true,
      }) as CanvasRenderingContext2D | null;
      if (!ctx) return;

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      const bgColor =
        getComputedStyle(document.documentElement)
          .getPropertyValue("--color-bg")
          .trim() || "#f5ead5";

      const images: HTMLImageElement[] = frameUrls.map((url) => {
        const img = new Image();
        img.src = url;
        return img;
      });

      let cancelled = false;
      let currentSegment = -1;
      let localIsExpanded = false;
      let isAnimating = false;
      let lastEndTime = 0;
      let containerActive = true;
      const state = { frame: 0 };
      let activeTween: gsap.core.Tween | null = null;

      const drawFrame = (frame: number) => {
        const lower = Math.floor(frame);
        const upper = Math.min(lower + 1, frameUrls.length - 1);
        const t = frame - lower;
        const smoothT = t * t * t * (t * (6 * t - 15) + 10);

        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (smoothT < 0.05 || smoothT > 0.95 || lower === upper) {
          ctx.globalAlpha = 1;
          const idx = smoothT > 0.5 ? upper : lower;
          ctx.drawImage(images[idx], 0, 0, canvas.width, canvas.height);
        } else {
          ctx.globalAlpha = 1;
          ctx.drawImage(images[lower], 0, 0, canvas.width, canvas.height);
          ctx.globalAlpha = smoothT;
          ctx.drawImage(images[upper], 0, 0, canvas.width, canvas.height);
          ctx.globalAlpha = 1;
        }
      };

      const playToFrame = (
        targetFrame: number,
        duration: number,
        onDone?: () => void,
      ) => {
        isAnimating = true;
        activeTween = gsap.to(state, {
          frame: targetFrame,
          duration,
          ease: "none",
          onUpdate: () => drawFrame(state.frame),
          onComplete: () => {
            isAnimating = false;
            lastEndTime = performance.now();
            activeTween = null;
            onDone?.();
          },
        });
      };

      const handleWheel = (e: WheelEvent) => {
        if (!containerActive) return;

        if (isExitedRef.current) return;

        const now = performance.now();
        const inCooldown = now - lastEndTime < COOLDOWN_MS;

        if (isAnimating || inCooldown) {
          e.preventDefault();
          return;
        }

        if (e.deltaY > 0) {
          // Spila næsta segment.
          if (localIsExpanded) return;

          if (currentSegment < segments.length - 1) {
            e.preventDefault();
            const next = currentSegment + 1;
            const isLastSegment = next === segments.length - 1;
            if (isLastSegment) {
              localIsExpanded = true;
              onExpandChange?.(true);
            }

            const nextDuration =
              segments[next].duration ?? DEFAULT_PLAYBACK_DURATION;
            playToFrame(segments[next].endFrame, nextDuration, () => {
              currentSegment = next;
              onSegmentChange?.(currentSegment);

              // Exit = true þegar síðasta segment klárast.
              if (isLastSegment) {
                isExitedRef.current = true;
                onExitChange?.(true);
              }
            });
          }
        } else if (e.deltaY < 0 && currentSegment >= 0) {
          e.preventDefault();

          if (localIsExpanded) {
            localIsExpanded = false;
            onExpandChange?.(false);
          }

          const target = currentSegment;
          const targetDuration =
            segments[target].duration ?? DEFAULT_PLAYBACK_DURATION;
          playToFrame(segments[target].startFrame, targetDuration, () => {
            currentSegment = target - 1;
            onSegmentChange?.(currentSegment);
          });
        }
      };

      const observer = new IntersectionObserver(
        (entries) => {
          containerActive = entries[0].isIntersecting;
        },
        { threshold: 0.5 },
      );
      observer.observe(container);

      Promise.all(images.map((img) => img.decode().catch(() => null))).then(
        () => {
          if (cancelled) return;
          drawFrame(0);
          window.addEventListener("wheel", handleWheel, { passive: false });
        },
      );

      return () => {
        cancelled = true;
        activeTween?.kill();
        observer.disconnect();
        window.removeEventListener("wheel", handleWheel);
      };
    },
    { scope: containerRef, dependencies: [isWideViewport] },
  );

  // Exit timeline fyrir canvas
  useGSAP(() => {
    if (!containerRef.current) return;
    const tl = gsap.timeline({ paused: true });
    tl.to(containerRef.current, {
      scaleY: 0,
      transformOrigin: "top center",
      duration: 0.5,
      ease: "power3.in",
    });
    exitTimelineRef.current = tl;
    return () => {
      tl.kill();
      exitTimelineRef.current = null;
    };
  });

  // Play & reverse exit canvas eftir isExited.
  useGSAP(
    () => {
      const tl = exitTimelineRef.current;
      if (!tl) return;

      if (isExited) {
        isExitedRef.current = true;
        tl.play();
      } else if (tl.totalTime() > 0) {
        tl.eventCallback("onReverseComplete", () => {
          isExitedRef.current = false;
        });
        tl.reverse();
      }
    },
    { dependencies: [isExited] },
  );

  return (
    <div ref={containerRef} className={styles.container}>
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.scrollIndicator}>
        <span className={styles.scrollText}>Scroll to explore</span>
        <ChevronDown size={20} strokeWidth={1.5} />
      </div>
    </div>
  );
}

export default HeroCanvas;
