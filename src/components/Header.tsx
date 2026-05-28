import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink to="/locations">Locations</NavLink>
        <NavLink to="/menu">Menus</NavLink>
        <NavLink to="/about">Our Story</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>

      <Link to="/" className={styles.logo}>Nordic Bites</Link>

      <div className={styles.ctaButtons}>
        <a
          href="https://wolt.com/en/isl/reykjavik"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.button}
        >
          Delivery
        </a>
        <button type="button" className={styles.button}>
          Takeout
        </button>
      </div>
    </header>
  );
}

export default Header;
