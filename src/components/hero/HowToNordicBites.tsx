import styles from "./HowToNordicBites.module.css";

type Step = {
  number: string;
  label: string;
  description?: string;
  features?: string[];
  title?: string;
  bulletpoints?: string[];
};

const steps: Step[] = [
  {
    number: "1",
    label: "Packed Fresh",
    description:
      "Your order is prepared with care using high-quality ingredients and packed fresh for you.",
    features: [
      "Sustainably sourced ingredients",
      "Made to order, never pre-made",
      "Eco-friendly packaging",
    ],
  },
  {
    number: "2",
    label: "Choose Your Box",
    title: "Pick the box that fits your morning.",
    bulletpoints: ["Breakfast Box", "Pancake Box", "House Coffee"],
  },
  {
    number: "3",
    label: "Ready To Enjoy",
    title: "Open it up and enjoy.",
    bulletpoints: ["Breakfast Set", "08:00 — 15:00", "Add to order"],
  },
];

type HowToNordicBitesProps = {
  segment: number; // -1 = initial, 0 = eftir fyrsta scroll, 1 = eftir scroll 2 
};

function HowToNordicBites({ segment }: HowToNordicBitesProps) {
  const stateIndex = Math.min(segment + 1, steps.length - 1);
  const current = steps[stateIndex];
  // 3 step progress bar
  const progress = (stateIndex / (steps.length - 1)) * 100;

  return (
    <div className={styles.howToNordicBites}>
      <div className={styles.heading}>
        How To
        <br />
        Nordic Bites
      </div>

      <div className={styles.numberBlock}>
        <span className={styles.number}>{current.number}</span>
      </div>

      <div className={styles.descriptive}>
        <div className={styles.spans}>
          <div className={styles.spanBackground} />
          <div
            className={styles.spanFill}
            style={{ height: `${progress}%` }}
          />
          <div
            className={styles.spanDot}
            style={{ top: `${progress}%` }}
          />
        </div>

        <div className={styles.contentBlock}>
          <span className={styles.label}>{current.label}</span>
          {current.description && (
            <p className={styles.description}>{current.description}</p>
          )}
          {current.features && (
            <ul className={styles.features}>
              {current.features.map((feat, i) => (
                <li key={i} className={styles.feature}>
                  {feat}
                </li>
              ))}
            </ul>
          )}
          {current.title && (
            <p className={styles.description}>{current.title}</p>
          )}
          {current.bulletpoints && (
            <ul className={styles.bullets}>
              {current.bulletpoints.map((bp, i) => (
                <li key={i} className={styles.bullet}>
                  {bp}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default HowToNordicBites;
