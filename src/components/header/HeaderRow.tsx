import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logoSvg from "../../assets/images/logo.svg";
import styles from "./HeaderRow.module.css";

function HeaderRow() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Body scroll lock þegar hamburger menu er opið

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Lokar hamburger menu á esc

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isMenuOpen]);

  // Lokar hamburger menu þegar viewport fer yfir 900px (desktop view)

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 900px)");
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) setIsMenuOpen(false);
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <Link to="/" className={styles.logo}>
            <img
              src={logoSvg}
              alt="Nordic Bites"
              className={styles.logoImage}
            />
          </Link>
          <p className={styles.tagline}>
            Nordic
            <br />
            Bites
          </p>
        </div>

        <div className={styles.headerActions}>
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
        </div>

        <button
          type="button"
          className={styles.menuButton}
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={isMenuOpen}
        >
          <Menu size={28} />
        </button>
      </header>

      {isMenuOpen && (
        <>
          <div
            className={styles.backdrop}
            onClick={closeMenu}
            aria-hidden="true"
          />
          <aside className={styles.drawer} aria-label="Mobile navigation">
            <button
              type="button"
              className={styles.closeButton}
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <X size={28} />
            </button>
            <nav className={styles.drawerNav}>
              <NavLink
                to="/"
                className={styles.drawerLink}
                onClick={closeMenu}
                end
              >
                Home
              </NavLink>
              <NavLink
                to="/menu"
                className={styles.drawerLink}
                onClick={closeMenu}
              >
                Menus
              </NavLink>
              <NavLink
                to="/about"
                className={styles.drawerLink}
                onClick={closeMenu}
              >
                Our Story
              </NavLink>
              <NavLink
                to="/contact"
                className={styles.drawerLink}
                onClick={closeMenu}
              >
                Contact
              </NavLink>
            </nav>
          </aside>
        </>
      )}
    </>
  );
}

export default HeaderRow;
