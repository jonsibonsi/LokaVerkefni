import { Link, NavLink } from "react-router-dom";
import InstagramIcon from "../icons/InstagramIcon";
import TiktokIcon from "../icons/TiktokIcon";
import logoSvg from "../../assets/images/logo.svg";
import styles from "./HeaderColumn.module.css";

function HeaderColumn() {
  return (
    <header className={styles.headerColumn}>
      <div className={styles.logoContainer}>
        <Link to="/" className={styles.logo}>
          <img src={logoSvg} alt="Nordic Bites" className={styles.logoImage} />
        </Link>
        <p className={styles.tagline}>
          Nordic<br />
          Bites
        </p>
      </div>

      <div className={styles.actions}>
        <div className={styles.ctas}>
          <a
            href="https://wolt.com/en/isl/reykjavik/restaurant/skipperinn"
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
        <nav className={styles.nav}>
          <NavLink to="/menu" className={styles.navLink}>
            Menus
          </NavLink>
          <NavLink to="/about" className={styles.navLink}>
            Our Story
          </NavLink>
          <NavLink to="/contact" className={styles.navLink}>
            Contact
          </NavLink>
        </nav>
      </div>

      <div className={styles.socials}>
        <a
          href="https://www.instagram.com/nordicbites_official/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className={styles.socialLink}
        >
          <InstagramIcon size={22} />
        </a>
        <a
          href="https://www.tiktok.com/@nordicbitesofficialub"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="TikTok"
          className={styles.socialLink}
        >
          <TiktokIcon size={22} />
        </a>
      </div>

      <div className={styles.info}>
        <div className={styles.infoBlock}>
          <span className={styles.infoLabel}>Location</span>
          <span className={styles.infoValue}>Reykjavík, Iceland</span>
        </div>
        <div className={styles.infoBlock}>
          <span className={styles.infoLabel}>Hours</span>
          <span className={styles.infoValue}>Daily · 22:00 — 04:00</span>
        </div>
      </div>
    </header>
  );
}

export default HeaderColumn;
