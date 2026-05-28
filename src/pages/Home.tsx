import type { MenuFetchState } from "../types";
import styles from "./Home.module.css";

function Home({ menuItems, loading, error }: MenuFetchState) {
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div>
      <div className={styles.heroWrapper}>
        <section className={styles.hero}>
          <span className={styles.line}>Nordic Bites</span>
          <span className={`${styles.line} ${styles.hollow}`}>Nordic Bites</span>
          <span className={`${styles.line} ${styles.hollow}`}>Nordic Bites</span>
        </section>
      </div>

      <p>Velkomin á Nordic Bites!</p>
      {menuItems.length > 0 && (
        <div>
          <h2>Matseðill</h2>
          <h3>{menuItems[0].name}</h3>
          <p>{menuItems[0].description}</p>
          <p>{menuItems[0].price}</p>
        </div>
      )}
    </div>
  );
}

export default Home;
