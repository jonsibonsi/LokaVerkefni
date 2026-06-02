import styles from "./Placeholder.module.css";

function Placeholder() {
  return (
    <section className={styles.placeholder}>
      <div className={styles.container}>
        <header className={styles.heading}>
          <h1 className={styles.title}>On the Menu</h1>
          <p className={styles.tagline}>
            Built for one. Ready in minutes. Open all night.
          </p>
        </header>

        <ul className={styles.list}>
          <li className={styles.item}>
            <div className={styles.itemHead}>
              <span className={styles.itemName}>Pancake Stack</span>
              <span className={styles.itemPrice}>8</span>
            </div>
            <p className={styles.itemDesc}>
              Icelandic pancakes with cloudberry jam and crème fraîche.
            </p>
          </li>
          <li className={styles.item}>
            <div className={styles.itemHead}>
              <span className={styles.itemName}>Skyr Bowl</span>
              <span className={styles.itemPrice}>7</span>
            </div>
            <p className={styles.itemDesc}>
              Vanilla skyr, oats, honey, seasonal berries.
            </p>
          </li>
          <li className={styles.item}>
            <div className={styles.itemHead}>
              <span className={styles.itemName}>The Full Plate</span>
              <span className={styles.itemPrice}>12</span>
            </div>
            <p className={styles.itemDesc}>
              Scrambled eggs, smoked bacon, sausage, sourdough toast.
            </p>
          </li>
          <li className={styles.item}>
            <div className={styles.itemHead}>
              <span className={styles.itemName}>Black Coffee</span>
              <span className={styles.itemPrice}>4</span>
            </div>
            <p className={styles.itemDesc}>
              Single-origin Reykjavík roast, pour-over.
            </p>
          </li>
        </ul>

        <div className={styles.infoRow}>
          <div className={styles.infoBlock}>
            <span className={styles.infoLabel}>Open</span>
            <span className={styles.infoValue}>Daily · 22:00 — 04:00</span>
          </div>
          <div className={styles.infoBlock}>
            <span className={styles.infoLabel}>Location</span>
            <span className={styles.infoValue}>Reykjavík, Iceland</span>
          </div>
          <div className={styles.infoBlock}>
            <span className={styles.infoLabel}>Order</span>
            <span className={styles.infoValue}>Wolt · Pickup</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Placeholder;
