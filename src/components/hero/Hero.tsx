import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import HeaderColumn from "../header/HeaderColumn";
import HeroCanvas from "./HeroCanvas";
import HowToNordicBites from "./HowToNordicBites";
import { useIsWideViewport } from "../../hooks/useIsWideViewport";
import creamBgUrl from "../../assets/scroll-animation/square/frame-186.webp?url";
import styles from "./Hero.module.css";

type HeroProps = {
  isExited?: boolean;
  onExitChange?: (exiting: boolean) => void;
};

function Hero({ isExited = false, onExitChange }: HeroProps = {}) {
  const [segment, setSegment] = useState(-1);
  const [isExpanded, setIsExpanded] = useState(false);
  const isWideViewport = useIsWideViewport();

  const heroRef = useRef<HTMLElement>(null);
  const bgLeftRef = useRef<HTMLDivElement>(null);
  const bgRightRef = useRef<HTMLDivElement>(null);

  const exitTimelineRef = useRef<gsap.core.Timeline | null>(null);

  // Stækka bakgrunnsbúta út á við.
  useGSAP(
    () => {
      if (!bgLeftRef.current || !bgRightRef.current) return;

      gsap.to(bgLeftRef.current, {
        scaleX: isExpanded ? 1 : 0,
        transformOrigin: "right center",
        duration: 0.5,
        ease: "power3.in",
      });
      gsap.to(bgRightRef.current, {
        scaleX: isExpanded ? 1 : 0,
        transformOrigin: "left center",
        duration: 0.5,
        ease: "power3.in",
      });
    },
    { dependencies: [isExpanded] },
  );

  // Smíða exit-tímalínu (paused).
  useGSAP(() => {
    const targets = [bgLeftRef.current, bgRightRef.current].filter(Boolean);
    if (targets.length === 0) return;

    const tl = gsap.timeline({ paused: true });
    tl.to(
      targets,
      {
        scaleY: 0,
        transformOrigin: "bottom center",
        duration: 0.5,
        ease: "power3.in",
      },
      0,
    );
    exitTimelineRef.current = tl;

    return () => {
      tl.kill();
      exitTimelineRef.current = null;
    };
  });

  // Spila eða spóla exit eftir isExited.
  useGSAP(
    () => {
      const tl = exitTimelineRef.current;
      if (!tl) return;

      if (isExited) tl.play();
      else if (tl.totalTime() > 0) tl.reverse();
    },
    { dependencies: [isExited] },
  );

  return (
    <section
      ref={heroRef}
      className={styles.hero}
      style={{ pointerEvents: isExited ? "none" : "auto" }}
    >
      <div
        ref={bgLeftRef}
        className={styles.bgLeft}
        style={{ backgroundImage: `url(${creamBgUrl})` }}
        aria-hidden="true"
      />
      <div
        ref={bgRightRef}
        className={styles.bgRight}
        style={{ backgroundImage: `url(${creamBgUrl})` }}
        aria-hidden="true"
      />

      <motion.div
        className={styles.leftGutter}
        initial={false}
        animate={{ opacity: isExpanded ? 0 : 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ pointerEvents: isExpanded ? "none" : "auto" }}
      >
        <HeaderColumn />
      </motion.div>
      <HeroCanvas
        isWideViewport={isWideViewport}
        isExited={isExited}
        onSegmentChange={setSegment}
        onExpandChange={setIsExpanded}
        onExitChange={onExitChange}
      />
      <motion.div
        className={styles.rightGutter}
        initial={false}
        animate={{ opacity: isExpanded ? 0 : 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ pointerEvents: isExpanded ? "none" : "auto" }}
      >
        <HowToNordicBites segment={segment} />
      </motion.div>
    </section>
  );
}

export default Hero;
