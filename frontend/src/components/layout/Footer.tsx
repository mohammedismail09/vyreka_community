import { Link } from "react-router-dom";
import logoLight from "../../assets/images/vyreka-nobg.png";
import logoDark from "../../assets/images/vyreka-wht-no-bg.png";

export default function Footer() {
  return (
    <footer className="footer-section w-full border-t border-gray-200 bg-gray-100 py-12 transition-colors duration-300 dark:border-outline-variant/10 dark:bg-surface-container-lowest">
      <div className="mx-auto grid h-full max-w-container-max grid-cols-1 gap-8 px-margin-mobile text-gray-900 md:grid-cols-3 md:px-margin-desktop dark:text-on-surface">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Link to="/">
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

            <Link to="/">
              <span className="text-[24px] font-bold tracking-tight text-gray-900 dark:text-on-surface">
                Vyreka
              </span>
            </Link>
          </div>

          <p className="text-sm text-gray-600 dark:text-on-surface-variant">
            Bridging the gap between theory and practice. Forging the industry
            leaders of tomorrow.
          </p>
        </div>

        <div className="space-y-4">
          <h5 className="text-sm font-bold uppercase tracking-widest text-indigo-600 dark:text-primary">
            Community
          </h5>

          <ul className="space-y-2 text-sm">
            <li>
              <Link
                className="text-gray-600 transition-colors hover:text-indigo-600 dark:text-on-surface-variant dark:hover:text-primary"
                to="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className="text-gray-600 transition-colors hover:text-indigo-600 dark:text-on-surface-variant dark:hover:text-primary"
                to="/events"
              >
                Events
              </Link>
            </li>
            <li>
              <Link
                className="text-gray-600 transition-colors hover:text-indigo-600 dark:text-on-surface-variant dark:hover:text-primary"
                to="/team"
              >
                Core Team
              </Link>
            </li>
            <li>
              <Link
                className="text-gray-600 transition-colors hover:text-indigo-600 dark:text-on-surface-variant dark:hover:text-primary"
                to="/partnership"
              >
                Partnership/Sponsorship
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h5 className="text-label-md font-bold uppercase tracking-widest text-indigo-600 dark:text-primary footer-header-text">
            Connect
          </h5>

          <div className="flex gap-4">
            <a
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-700 transition-all duration-300 hover:bg-indigo-600 hover:text-white dark:bg-surface-container-high dark:text-white dark:hover:bg-primary dark:hover:text-on-primary"
              href="https://www.linkedin.com/company/vyreka"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
            >
              <svg
                className="h-5 w-5 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>

            <a
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-700 transition-all duration-300 hover:bg-indigo-600 hover:text-white dark:bg-surface-container-high dark:text-white dark:hover:bg-primary dark:hover:text-on-primary"
              href="https://www.instagram.com/_vyreka_"
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram"
            >
              <svg
                className="h-5 w-5 fill-none stroke-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
                strokeWidth="2"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>
          <p className="text-label-sm text-gray-500 dark:text-on-surface-variant mt-4 copyright-text">
            © 2026 Vyreka Community. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
