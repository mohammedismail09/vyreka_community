import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

type LayoutProps = {
  theme: "dark" | "light";
  toggleTheme: () => void;
};

export default function Layout({ theme, toggleTheme }: LayoutProps) {
  const isLight = theme === "light";

  return (
    <div className={theme}>
      <div
        className={`min-h-screen transition-colors duration-300 ${
          isLight ? "bg-slate-50 text-slate-900" : "bg-slate-950 text-white"
        }`}
      >
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
