import { useEffect, useMemo, useState } from "react";

type EventItem = {
  id: number;
  title: string;
  date: string;
  description: string | null;
  venue: string | null;
  registration_link: string | null;
  is_live: boolean;
};

type Countdown = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  isExpired: boolean;
};

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:8000";

function formatEventDate(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function getCountdown(dateString: string): Countdown {
  const now = new Date().getTime();
  const target = new Date(dateString).getTime();
  const distance = target - now;

  if (distance < 0) {
    return {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
      isExpired: true,
    };
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  return {
    days: String(days).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
    isExpired: false,
  };
}

function EventCountdown({ date }: { date: string }) {
  const [countdown, setCountdown] = useState<Countdown>(() =>
    getCountdown(date),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdown(date));
    }, 1000);

    return () => clearInterval(interval);
  }, [date]);

  if (countdown.isExpired) {
    return (
      <div className="flex items-center justify-center rounded-xl border border-gray-200 bg-white p-3 shadow-sm dark:border-white/5 dark:bg-surface-container-high/60 dark:shadow-none">
        <div className="py-2 font-bold tracking-wider text-red-600 dark:text-error">
          Registration Closed
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white p-3 shadow-sm dark:border-white/5 dark:bg-surface-container-high/60 dark:shadow-none">
      <div className="min-w-[50px] text-center">
        <div className="text-headline-md font-bold text-purple-900 dark:text-primary">
          {countdown.days}
        </div>
        <div className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-on-surface dark:opacity-60">
          Days
        </div>
      </div>

      <span className="mb-4 text-headline-md font-bold text-indigo-900 dark:text-primary">
        :
      </span>

      <div className="min-w-[50px] text-center">
        <div className="text-headline-md font-bold text-purple-900 dark:text-primary">
          {countdown.hours}
        </div>
        <div className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-on-surface dark:opacity-60">
          Hrs
        </div>
      </div>

      <span className="mb-4 text-headline-md font-bold text-indigo-900 dark:text-primary">
        :
      </span>

      <div className="min-w-[50px] text-center">
        <div className="text-headline-md font-bold text-purple-900 dark:text-primary">
          {countdown.minutes}
        </div>
        <div className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-on-surface dark:opacity-60">
          Mins
        </div>
      </div>

      <span className="mb-4 text-headline-md font-bold text-indigo-900 dark:text-primary">
        :
      </span>

      <div className="min-w-[50px] text-center">
        <div className="text-headline-md font-bold text-purple-900 dark:text-primary">
          {countdown.seconds}
        </div>
        <div className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-on-surface dark:opacity-60">
          Secs
        </div>
      </div>
    </div>
  );
}

function EventCard({ event }: { event: EventItem }) {
  const venueText = event.venue?.trim() || "To Be Announced";

  return (
    <div
      className={`min-h-[420px] rounded-2xl border p-6 transition-all duration-300 group flex flex-col justify-between hover:-translate-y-1 hover:shadow-md ${
        event.is_live
          ? "border border-indigo-100 bg-indigo-50/50 dark:border-primary/30 dark:bg-primary-container/10"
          : "border border-gray-200 bg-white dark:border-outline-variant/20 dark:bg-surface-container/40"
      }`}
    >
      <div>
        <div className="mb-4 flex items-center justify-between">
          <span
            className={`text-label-sm font-bold uppercase ${
              event.is_live
                ? "text-purple-900 dark:text-primary"
                : "text-gray-500 dark:text-on-surface-variant"
            }`}
          >
            {formatEventDate(event.date)}
          </span>

          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
              event.is_live
                ? "bg-purple-200 text-purple-900 dark:bg-primary dark:text-on-primary"
                : "bg-gray-100 text-gray-600 dark:bg-surface-container-high dark:text-on-surface-variant"
            }`}
          >
            {event.is_live ? "Live" : "Archived"}
          </span>
        </div>

        <h3 className="mb-2 text-headline-md font-bold text-gray-900 dark:text-on-surface">
          {event.title}
        </h3>

        <p className="mb-6 text-body-md text-gray-600 dark:text-on-surface-variant">
          {event.description?.trim() ||
            "No description provided for this community event."}
        </p>
      </div>

      <div className="space-y-4">
        {event.is_live && <EventCountdown date={event.date} />}

        <div className="flex items-center gap-2 text-gray-600 transition-colors duration-300 dark:text-on-surface-variant">
          <svg
            className="h-4 w-4 shrink-0 fill-none stroke-current stroke-2 text-indigo-600 dark:text-primary"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>

          <span className="truncate text-body-md font-medium" title={venueText}>
            {venueText}
          </span>
        </div>

        {event.is_live && (
          <>
            <br />
            {event.registration_link ? (
              <a
                href={event.registration_link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-200 py-3 font-bold text-purple-900 transition-colors hover:bg-purple-300 dark:bg-primary dark:text-on-primary dark:group-hover:bg-primary/90">
                  Register Now
                  <span className="material-symbols-outlined text-sm">
                    ads_click
                  </span>
                </button>
              </a>
            ) : (
              <button
                className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-gray-300 py-3 font-bold text-gray-600"
                disabled
              >
                Registration Coming Soon
                <span className="material-symbols-outlined text-sm">
                  hourglass_empty
                </span>
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const sortedEvents = useMemo(() => {
    return [...events].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }, [events]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`${BACKEND_URL}/api/events/`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to load events.");
        }

        setEvents(Array.isArray(data.events) ? data.events : []);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong while loading events.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <main className="pt-20 dark:bg-background">
      <section className="py-stack-xl">
        <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
          <div className="mb-stack-xl text-center">
            <h2 className="text-headline-lg font-bold tracking-tight text-indigo-800 dark:text-on-surface">
              Vyreka Community Events
            </h2>
            <p className="mt-2 text-body-md text-gray-600 dark:text-on-surface-variant">
              Explore our upcoming and past events.
            </p>
          </div>

          {isLoading ? (
            <div className="py-12 text-center text-gray-500 dark:text-on-surface-variant">
              Loading events...
            </div>
          ) : error ? (
            <div className="py-12 text-center text-red-600 dark:text-error">
              {error}
            </div>
          ) : sortedEvents.length === 0 ? (
            <div className="py-12 text-center text-gray-500 dark:text-on-surface-variant">
              No events listed yet. Check back soon!
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
              {sortedEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
