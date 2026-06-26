import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logoLight from "../../assets/images/vyreka-nobg.png";
import logoDark from "../../assets/images/vyreka-wht-no-bg.png";

type NavbarProps = {
  theme: "dark" | "light";
  toggleTheme: () => void;
};

const whatsappLink =
  "https://chat.whatsapp.com/Lp8HCvoz8NyLS1ynXKLDDz?s=sh&p=a&ilr=2";

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isLight = theme === "light";

  const desktopLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-indigo-600 dark:text-primary font-bold border-b-2 border-indigo-900 dark:border-primary py-1"
      : "text-gray-600 dark:text-on-surface-variant hover:text-indigo-600 dark:hover:text-primary transition-colors";

  const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-xl font-bold text-indigo-600 dark:text-primary py-2 border-b border-gray-100 dark:border-white/5"
      : "text-xl font-semibold text-gray-700 dark:text-on-surface hover:text-indigo-600 dark:hover:text-primary py-2 border-b border-gray-100 dark:border-white/5";

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <header className="fixed top-0 z-50 h-20 w-full border-b border-gray-200 bg-white/80 backdrop-blur-xl transition-colors duration-300 dark:border-white/10 dark:bg-surface/80">
      <div className="mx-auto flex h-full max-w-container-max items-center justify-between px-margin-mobile md:px-margin-desktop">
        <div className="flex items-center gap-2">
          <Link to="/" onClick={closeMobileMenu}>
            <img
              className="block h-12 w-12 object-contain dark:hidden"
              src={logoLight}
              alt="Vyreka Logo"
            />
            <img
              className="hidden h-12 w-12 object-contain dark:block"
              src={logoDark}
              alt="Vyreka Logo"
            />
          </Link>

          <Link to="/" onClick={closeMobileMenu}>
            <span className="text-[24px] font-bold tracking-tight text-gray-900 dark:text-on-surface">
              Vyreka
            </span>
          </Link>
        </div>

        <nav className="hidden items-center gap-stack-lg md:flex">
          <NavLink to="/" end className={desktopLinkClass}>
            Home
          </NavLink>
          <NavLink to="/events" className={desktopLinkClass}>
            Events
          </NavLink>
          <NavLink to="/about-us" className={desktopLinkClass}>
            About Us
          </NavLink>
          <NavLink to="/team" className={desktopLinkClass}>
            Core Team
          </NavLink>
          <NavLink to="/contact-us" className={desktopLinkClass}>
            Contact
          </NavLink>
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <button
            className="z-50 rounded-full p-2 text-gray-700 transition-all hover:bg-gray-100 dark:text-on-surface dark:hover:bg-white/5"
            id="theme-toggle"
            onClick={toggleTheme}
            type="button"
            aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
          >
            <span className="material-symbols-outlined" id="theme-icon">
              {isLight ? "dark_mode" : "light_mode"}
            </span>
          </button>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block"
          >
            <button className="rounded-full bg-indigo-600 text-white px-6 py-2 font-medium transition-opacity hover:opacity-90 dark:bg-primary-container">
              Join Community
            </button>
          </a>

          <button
            className="z-50 rounded-full p-2 text-gray-700 transition-all hover:bg-gray-100 focus:outline-none dark:text-on-surface dark:hover:bg-white/5 md:hidden"
            id="mobile-menu-toggle"
            aria-label="Toggle Menu"
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu-drawer"
          >
            <span
              className="material-symbols-outlined block text-2xl"
              id="mobile-menu-icon"
            >
              {mobileOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu-drawer"
        className={`fixed inset-0 top-20 z-40 h-[calc(100vh-80px)] w-full flex-col justify-between bg-white p-6 shadow-xl backdrop-blur-xl transition-all duration-300 dark:bg-surface ${
          mobileOpen ? "flex md:hidden" : "hidden"
        }`}
      >
        <nav className="flex flex-col gap-6 pt-8 text-center">
          <NavLink
            to="/"
            end
            className={mobileLinkClass}
            onClick={closeMobileMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/events"
            className={mobileLinkClass}
            onClick={closeMobileMenu}
          >
            Events
          </NavLink>
          <NavLink
            to="/about-us"
            className={mobileLinkClass}
            onClick={closeMobileMenu}
          >
            About Us
          </NavLink>
          <NavLink
            to="/team"
            className={mobileLinkClass}
            onClick={closeMobileMenu}
          >
            Core Team
          </NavLink>
          <NavLink
            to="/contact-us"
            className={({ isActive }) =>
              isActive
                ? "text-xl font-bold text-indigo-600 dark:text-primary py-2"
                : "text-xl font-semibold text-gray-700 dark:text-on-surface hover:text-indigo-600 dark:hover:text-primary py-2"
            }
            onClick={closeMobileMenu}
          >
            Contact
          </NavLink>
        </nav>

        <div className="pb-12 text-center">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full"
          >
            <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 text-white py-4 font-bold shadow-lg shadow-indigo-600/10 dark:bg-primary-container">
              Join Community
              <span className="material-symbols-outlined text-sm">
                rocket_launch
              </span>
            </button>
          </a>
        </div>
      </div>
    </header>
  );
}
