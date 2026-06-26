import { Link } from "react-router-dom";

export default function PartnershipPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-6 font-body-md transition-colors duration-300 dark:bg-background">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="relative mx-auto flex h-40 w-40 items-center justify-center rounded-full border border-purple-200 bg-purple-100 animate-pulse dark:border-outline-variant/30 dark:bg-surface-container/60">
          <span className="material-symbols-outlined text-6xl text-purple-900 animate-bounce dark:text-primary [animation-duration:2s]">
            construction
          </span>

          <span className="material-symbols-outlined absolute right-4 top-4 text-2xl text-amber-500 animate-spin [animation-duration:6s]">
            settings
          </span>

          <span className="material-symbols-outlined absolute bottom-6 left-4 text-xl text-indigo-400 animate-spin [animation-direction:reverse] [animation-duration:3s]">
            settings
          </span>
        </div>

        <div className="space-y-3">
          <span className="inline-block rounded-full bg-purple-200 px-3 py-1 text-xs font-bold uppercase tracking-widest text-purple-900 dark:bg-primary/20 dark:text-primary">
            Under Development
          </span>

          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-on-surface">
            Brb, cooking something cool!
          </h2>

          <p className="text-body-md leading-relaxed text-gray-600 dark:text-on-surface-variant">
            Our partnerships space is under development. Please check back later
            or, if it's urgent, contact us via{" "}
            <Link to="/contact-us" className="underline">
              contact page
            </Link>
            .
          </p>
        </div>

        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex scale-100 items-center justify-center gap-2 rounded-full bg-purple-200 px-8 py-3 font-bold text-purple-900 shadow-sm transition-all active:scale-95 hover:bg-purple-300 dark:bg-primary dark:text-on-primary"
          >
            Take Me Home
            <span className="material-symbols-outlined text-sm">home</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
