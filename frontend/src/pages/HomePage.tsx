import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import founderImg from "../assets/images/founder.jpg";
import pradeepImg from "../assets/images/pradeep.jpeg";
import saikiranImg from "../assets/images/saikiran.jpeg";
import ismailImg from "../assets/images/ismail.jpeg";

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

type ContactFormState = {
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  message: string;
};

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:8000";

const stats = [
  { value: 120, label: "Members", color: "text-indigo-600 dark:text-primary" },
  {
    value: 7,
    label: "Workshops",
    color: "text-purple-600 dark:text-secondary",
  },
  { value: 10, label: "Experts", color: "text-amber-600 dark:text-tertiary" },
  { value: 5, label: "Events", color: "text-red-600 dark:text-error" },
];

const valueCards = [
  {
    icon: "engineering",
    title: "Industry-Oriented Learning",
    text: "Our curriculum is designed in collaboration with active professionals to ensure you learn exactly what the market demands today.",
    iconWrap:
      "bg-indigo-50 dark:bg-primary/10 group-hover:bg-indigo-600 dark:group-hover:bg-primary",
    iconColor:
      "text-indigo-600 dark:text-primary group-hover:text-white dark:group-hover:text-on-primary",
  },
  {
    icon: "handyman",
    title: "Hands-On Workshops",
    text: "No boring lectures. Build projects, solve real tickets, and gain practical experience through our interactive lab sessions.",
    iconWrap:
      "bg-purple-50 dark:bg-secondary/10 group-hover:bg-purple-600 dark:group-hover:bg-secondary",
    iconColor:
      "text-purple-600 dark:text-secondary group-hover:text-white dark:group-hover:text-on-secondary",
  },
  {
    icon: "groups",
    title: "Direct Industry Exposure",
    text: "Get access to office visits, shadow programs, and guest lectures from leaders at top-tier global companies.",
    iconWrap:
      "bg-amber-50 dark:bg-tertiary/10 group-hover:bg-amber-600 dark:group-hover:bg-tertiary",
    iconColor:
      "text-amber-600 dark:text-tertiary group-hover:text-white dark:group-hover:text-on-tertiary",
  },
];

const ecosystemItems = [
  {
    icon: "diversity_3",
    title: "Peer Synergy Mentorship",
    text: "Collaborate with experienced community mentors to streamline your professional development timeline.",
    color:
      "text-indigo-600 dark:text-primary hover:border-indigo-600/40 dark:hover:border-primary/40",
  },
  {
    icon: "rate_review",
    title: "Collective Resume Audits",
    text: "Refine profile layouts together via interactive community workshops built to exceed filter thresholds.",
    color:
      "text-purple-600 dark:text-secondary hover:border-purple-600/40 dark:hover:border-secondary/40",
  },
  {
    icon: "forum",
    title: "Peer Mock Interviews",
    text: "Practice live with builders inside standard technical and dynamic behavioral environments.",
    color:
      "text-amber-600 dark:text-tertiary hover:border-amber-600/40 dark:hover:border-tertiary/40",
  },
  {
    icon: "hub",
    title: "Ecosystem Integration Labs",
    text: "Gain unhindered entry to shared server testbeds and open-source workspace assets.",
    color:
      "text-red-600 dark:text-error hover:border-red-600/40 dark:hover:border-error/40",
  },
  {
    icon: "terminal",
    title: "Collaborative Code Sprints",
    text: "Ship production internal systems and build responsive open projects side-by-side with peers.",
    color:
      "text-indigo-600 dark:text-primary hover:border-indigo-600/40 dark:hover:border-primary/40",
  },
  {
    icon: "groups_3",
    title: "Soft Skills Circles",
    text: "Accelerate collective leadership, system negotiation models, and clear engineering team dialogue.",
    color:
      "text-purple-600 dark:text-secondary hover:border-purple-600/40 dark:hover:border-secondary/40",
  },
];

const leadership = [
  {
    name: "Vaishnavi Devi",
    role: "Founder",
    image: founderImg,
    roleColor: "text-purple-600 dark:text-secondary",
  },
  {
    name: "Pradeep Kiran",
    role: "Community Lead",
    image: pradeepImg,
    roleColor: "text-indigo-600 dark:text-primary",
  },
  {
    name: "Guggilla SaiKiran",
    role: "Community Lead",
    image: saikiranImg,
    roleColor: "text-amber-600 dark:text-tertiary",
  },
  {
    name: "Mohammed Ismail",
    role: "Technical Lead",
    image: ismailImg,
    roleColor: "text-red-600 dark:text-error",
  },
];

const testimonials = [
  {
    quote:
      "Vyreka's First Job Loading workshop was the turning point in my job search. Within 3 weeks of the networking event, I landed my first role at a Fortune 500 company.",
    name: "Rahul Deshmukh",
    role: "Software Engineer @ TATA",
    initials: "RD",
    accent:
      "bg-indigo-50 text-indigo-600 dark:bg-primary-container/20 dark:text-primary",
  },
  {
    quote:
      "The mentorship here is unmatched. My mentor didn't just review my code; they taught me how to think like an industrial architect. Truly eye-opening.",
    name: "Ananya Mehta",
    role: "Data Scientist @ Adobe",
    initials: "AM",
    accent:
      "bg-purple-50 text-purple-600 dark:bg-secondary-container/20 dark:text-secondary",
  },
  {
    quote:
      "Bridging the gap is exactly what they do. I finally feel like my academic knowledge has a place in the real world thanks to the RAG workshops.",
    name: "Siddharth Kapoor",
    role: "Final Year Student @ IIT",
    initials: "SK",
    accent:
      "bg-amber-50 text-amber-600 dark:bg-tertiary-container/20 dark:text-tertiary",
  },
];

function formatEventDate(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function getCountdown(dateString: string): Countdown {
  const now = new Date().getTime();
  const target = new Date(dateString).getTime();
  const diff = target - now;

  if (diff <= 0) {
    return {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
      isExpired: true,
    };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return {
    days: String(days).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
    isExpired: false,
  };
}

function AnimatedCounter({
  target,
  className,
}: {
  target: number;
  className: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1400;
    const increment = Math.max(1, Math.floor(target / 50));

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, duration / 50);

    return () => clearInterval(timer);
  }, [target]);

  return <div className={className}>{count}</div>;
}

function FeaturedEventCountdown({ date }: { date: string }) {
  const [countdown, setCountdown] = useState<Countdown>(() =>
    getCountdown(date),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdown(date));
    }, 1000);

    return () => clearInterval(timer);
  }, [date]);

  if (countdown.isExpired) {
    return (
      <div className="mb-stack-lg">
        <span className="rounded-xl border border-secondary/20 bg-secondary/10 px-4 py-2 text-body-md font-semibold tracking-wide text-secondary">
          Event Underway / Live Session Running!
        </span>
      </div>
    );
  }

  const items = [
    { label: "Days", value: countdown.days },
    { label: "Hrs", value: countdown.hours },
    { label: "Min", value: countdown.minutes },
    { label: "Sec", value: countdown.seconds },
  ];

  return (
    <div className="mb-stack-lg flex flex-wrap gap-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="min-w-[80px] rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm dark:border-white/5 dark:bg-surface-container-high"
        >
          <div className="text-headline-md font-bold text-indigo-600 dark:text-primary">
            {item.value}
          </div>
          <div className="text-label-sm uppercase text-gray-500 dark:text-white dark:opacity-60">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function getTimelineAccent(index: number, isLeft: boolean) {
  const palette = [
    {
      border: isLeft
        ? "md:border-r-4 md:border-r-indigo-600 dark:md:border-r-primary"
        : "border-l-4 border-l-indigo-600 dark:border-l-primary",
      dot: "border-indigo-600 dark:border-primary",
      dotInner: "bg-indigo-600 dark:bg-primary",
      text: "text-indigo-600 dark:text-primary",
    },
    {
      border: isLeft
        ? "md:border-r-4 md:border-r-purple-600 dark:md:border-r-secondary"
        : "border-l-4 border-l-purple-600 dark:border-l-secondary",
      dot: "border-purple-600 dark:border-secondary",
      dotInner: "bg-purple-600 dark:bg-secondary",
      text: "text-purple-600 dark:text-secondary",
    },
    {
      border: isLeft
        ? "md:border-r-4 md:border-r-amber-500 dark:md:border-r-tertiary"
        : "border-l-4 border-l-amber-500 dark:border-l-tertiary",
      dot: "border-amber-500 dark:border-tertiary",
      dotInner: "bg-amber-500 dark:bg-tertiary",
      text: "text-amber-600 dark:text-tertiary",
    },
    {
      border: isLeft
        ? "md:border-r-4 md:border-r-red-500 dark:md:border-r-error"
        : "border-l-4 border-l-red-500 dark:border-l-error",
      dot: "border-red-500 dark:border-error",
      dotInner: "bg-red-500 dark:bg-error",
      text: "text-red-600 dark:text-error",
    },
  ];

  return palette[index % palette.length];
}

export default function HomePage() {
  const [homepageEvents, setHomepageEvents] = useState<EventItem[]>([]);
  const [eventsLoading, setEventsLoading] = useState(true);

  const [formData, setFormData] = useState<ContactFormState>({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    message: "",
  });

  const [submitState, setSubmitState] = useState<{
    loading: boolean;
    success: string | null;
    error: string | null;
  }>({
    loading: false,
    success: null,
    error: null,
  });

  useEffect(() => {
    const fetchHomepageEvents = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/events/homepage/`);
        const data = await response.json();

        if (response.ok && Array.isArray(data.events)) {
          setHomepageEvents(data.events);
        }
      } catch (error) {
        console.error("Failed to fetch homepage events", error);
      } finally {
        setEventsLoading(false);
      }
    };

    fetchHomepageEvents();
  }, []);

  const latestEvent = useMemo(
    () => homepageEvents[0] ?? null,
    [homepageEvents],
  );
  const timelineEvents = useMemo(
    () => homepageEvents.slice(1),
    [homepageEvents],
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitState({
      loading: true,
      success: null,
      error: null,
    });

    try {
      const response = await fetch(`${BACKEND_URL}/api/contact/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      setSubmitState({
        loading: false,
        success: data.message || "Your message has been sent successfully!",
        error: null,
      });

      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        mobile: "",
        message: "",
      });
    } catch (error) {
      setSubmitState({
        loading: false,
        success: null,
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <main className="pt-20 dark:bg-background">
      <section className="relative flex min-h-[calc(100vh-80px)] items-center overflow-hidden">
        <div className="relative z-10 mx-auto w-full max-w-container-max px-margin-mobile py-stack-xl md:px-margin-desktop">
          <div className="max-w-3xl">
            <h1 className="hero-title mb-stack-md bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-headline-xl-mobile text-transparent dark:from-primary dark:to-secondary md:text-headline-xl">
              Bridging the Gap Between Education and Industry
            </h1>

            <p className="hero-desc mb-stack-lg text-body-lg leading-relaxed text-gray-600 dark:text-on-surface-variant">
              Helping students and professionals build real-world skills through
              workshops, mentorship, networking, and industry exposure. Join the
              visionary community shaping the future of industrial talent.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="https://chat.whatsapp.com/Lp8HCvoz8NyLS1ynXKLDDz?s=sh&p=a&ilr=2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="hero-main-cta flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-8 py-4 font-label-md text-white transition-all hover:opacity-90 hover:shadow-lg hover:shadow-indigo-600/20 active:scale-95 dark:bg-primary-container dark:hover:shadow-primary/20">
                  Join Community
                  <span className="material-symbols-outlined">
                    rocket_launch
                  </span>
                </button>
              </a>

              <Link to="/events">
                <button className="hero-secondary-btn flex items-center justify-center gap-2 rounded-full border border-gray-300 px-8 py-4 font-label-md text-gray-900 backdrop-blur-sm transition-all hover:bg-gray-50 active:scale-95 dark:border-outline-variant dark:text-on-surface dark:hover:bg-white/5">
                  Explore Events
                  <span className="material-symbols-outlined">event</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-section bg-gray-50 py-stack-xl transition-colors duration-300 dark:bg-surface-container-low">
        <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-2 gap-gutter text-center md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <AnimatedCounter
                  target={stat.value}
                  className={`mb-1 text-headline-xl font-bold ${stat.color}`}
                />
                <div className="stats-label text-label-md uppercase tracking-widest text-gray-500 dark:text-on-surface-variant">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-stack-xl">
        <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
          <div className="mb-stack-lg">
            <h2 className="grid-title text-headline-lg text-gray-900 dark:text-on-surface">
              Why Choose Vyreka?
            </h2>
            <p className="grid-desc mt-2 text-body-md text-gray-600 dark:text-on-surface-variant">
              Empowering the next generation with practical excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
            {valueCards.map((card) => (
              <div
                key={card.title}
                className="glass-card group rounded-xl border border-gray-100 bg-gray-50/50 p-stack-lg text-gray-900 transition-all duration-300 hover:-translate-y-2 dark:border-white/5 dark:bg-transparent dark:text-on-surface"
              >
                <div
                  className={`mb-stack-md flex h-12 w-12 items-center justify-center rounded-lg transition-colors ${card.iconWrap}`}
                >
                  <span
                    className={`material-symbols-outlined ${card.iconColor}`}
                  >
                    {card.icon}
                  </span>
                </div>
                <h3 className="card-title mb-2 text-headline-md font-semibold">
                  {card.title}
                </h3>
                <p className="bento-p text-gray-600 dark:text-on-surface-variant">
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {!eventsLoading && latestEvent && (
        <section className="relative overflow-hidden py-stack-xl">
          <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
            <div className="spotlight-box relative overflow-hidden rounded-3xl border border-indigo-100 bg-purple-100 p-stack-lg dark:border-primary/20 dark:bg-primary-container/10 md:p-stack-xl">
              <div className="absolute right-0 top-0 -z-10 h-64 w-64 bg-indigo-600/5 blur-3xl dark:bg-primary/20" />

              <div className="grid items-center gap-stack-xl md:grid-cols-2">
                <div className="text-gray-900 dark:text-on-surface">
                  <span className="mb-4 inline-block rounded-full bg-amber-600 px-4 py-1 text-label-sm font-semibold uppercase tracking-wider text-white dark:bg-tertiary-container">
                    {latestEvent.is_live
                      ? "Live Community Event"
                      : "Latest Community Event"}
                  </span>

                  <h2 className="spotlight-title mb-2 text-headline-xl text-gray-900 dark:text-white">
                    {latestEvent.title}
                  </h2>

                  <p className="mb-4 flex flex-wrap items-center gap-2 text-sm font-bold text-gray-700 dark:text-secondary">
                    <span className="material-symbols-outlined text-sm">
                      location_on
                    </span>
                    Venue: {latestEvent.venue?.trim() || "TBA"}
                    <span className="mx-2">•</span>
                    <span className="material-symbols-outlined text-sm">
                      calendar_month
                    </span>
                    {formatEventDate(latestEvent.date)}
                  </p>

                  <p className="spotlight-p mb-stack-lg text-body-lg text-gray-600 dark:text-on-surface-variant">
                    {latestEvent.description?.trim() ||
                      "Join our latest community event and connect with builders, learners, and professionals across the Vyreka ecosystem."}
                  </p>

                  <FeaturedEventCountdown date={latestEvent.date} />

                  {latestEvent.registration_link ? (
                    <a
                      href={latestEvent.registration_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      <button className="spotlight-main-btn flex items-center gap-2 rounded-full bg-indigo-600 px-8 py-4 font-label-md text-white transition-all hover:opacity-90 dark:bg-primary dark:text-on-primary">
                        Register Now
                        <span className="material-symbols-outlined">
                          ads_click
                        </span>
                      </button>
                    </a>
                  ) : (
                    <Link to="/events" className="inline-block">
                      <button className="spotlight-main-btn flex items-center gap-2 rounded-full bg-indigo-600 px-8 py-4 font-label-md text-white transition-all hover:opacity-90 dark:bg-primary dark:text-on-primary">
                        Explore Events
                        <span className="material-symbols-outlined">
                          arrow_forward
                        </span>
                      </button>
                    </Link>
                  )}
                </div>

                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <div className="image-container flex aspect-video items-center justify-center bg-gray-200 dark:bg-surface-container-highest">
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-600 p-8 text-center text-white">
                      <div>
                        <div className="mb-3 text-label-sm uppercase tracking-[0.2em] opacity-80">
                          Vyreka Latest Event
                        </div>
                        <h3 className="text-2xl font-bold">
                          {latestEvent.title}
                        </h3>
                        <p className="mt-3 text-sm opacity-90">
                          {latestEvent.venue?.trim() || "Venue to be announced"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {!eventsLoading && timelineEvents.length > 0 && (
        <section className="timeline-section bg-gray-50 py-stack-xl transition-colors duration-300 dark:bg-surface-container-lowest">
          <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
            <div className="mb-stack-xl text-center">
              <h2 className="timeline-title text-headline-lg text-gray-900 dark:text-on-surface">
                The Vyreka Journey
              </h2>
              <p className="timeline-desc text-body-md text-gray-600 dark:text-on-surface-variant">
                Explore our latest community milestones and recent events.
              </p>
            </div>

            <div className="relative">
              <div className="timeline-line absolute bottom-0 left-4 top-0 w-0.5 bg-gray-200 dark:bg-outline-variant/20 md:left-1/2 md:-translate-x-1/2" />

              <div className="space-y-12">
                {timelineEvents.map((event, index) => {
                  const isLeft = index % 2 !== 0;
                  const accentStyles = getTimelineAccent(index, isLeft);

                  return (
                    <div
                      key={event.id}
                      className="relative flex w-full flex-col items-start md:flex-row md:items-center md:justify-between"
                    >
                      {!isLeft && (
                        <div className="hidden md:block md:w-[45%]" />
                      )}

                      <div
                        className={`absolute left-4 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-4 bg-white dark:bg-surface-container-high md:left-1/2 ${accentStyles.dot}`}
                      >
                        <div
                          className={`h-2 w-2 rounded-full ${accentStyles.dotInner}`}
                        />
                      </div>

                      <div
                        className={`glass-card ml-12 rounded-xl border border-gray-100 bg-white p-6 text-gray-900 dark:border-white/5 dark:bg-transparent dark:text-on-surface md:ml-0 md:w-[45%] ${
                          isLeft ? "text-left md:text-right" : "text-left"
                        } ${accentStyles.border}`}
                      >
                        <span
                          className={`timeline-date block text-label-sm font-bold ${accentStyles.text}`}
                        >
                          {event.is_live
                            ? "LIVE EVENT"
                            : formatEventDate(event.date).toUpperCase()}
                        </span>

                        <h4 className="card-title mt-1 text-headline-md">
                          {event.title}
                        </h4>

                        <p className="timeline-p mt-2 text-gray-600 dark:text-on-surface-variant">
                          {event.description?.trim() ||
                            "Explore this event on the Events page for more details."}
                        </p>

                        <div
                          className={`mt-3 text-sm font-semibold ${accentStyles.text}`}
                        >
                          Venue: {event.venue?.trim() || "TBA"}
                        </div>

                        <Link
                          to="/events"
                          className={`timeline-action-btn mt-4 flex w-full items-center gap-2 font-bold ${accentStyles.text} ${
                            isLeft ? "md:justify-end" : ""
                          }`}
                        >
                          Explore on Events Page
                          <span className="material-symbols-outlined">
                            arrow_forward
                          </span>
                        </Link>
                      </div>

                      {isLeft ? (
                        <div className="hidden md:block md:w-[45%]" />
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-stack-xl">
        <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
          <div className="mb-stack-xl">
            <h2 className="ecosystem-title text-headline-lg text-gray-900 dark:text-on-surface">
              Our Specialized Community Ecosystem
            </h2>
            <p className="ecosystem-desc text-body-md text-gray-600 dark:text-on-surface-variant">
              Every element is engineered for peer support and shared growth
              loop acceleration.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ecosystemItems.map((item) => (
              <div
                key={item.title}
                className={`glass-card rounded-2xl border border-gray-100 bg-gray-50/50 p-8 text-gray-900 transition-colors dark:border-white/5 dark:bg-transparent dark:text-on-surface ${item.color}`}
              >
                <span
                  className={`material-symbols-outlined mb-4 text-4xl ${item.color.split(" hover")[0]}`}
                >
                  {item.icon}
                </span>
                <h4 className="card-title mb-2 text-headline-md text-gray-900 dark:text-on-surface-variant">
                  {item.title}
                </h4>
                <p className="ecosystem-p text-gray-600 dark:text-on-surface-variant">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="team-section bg-gray-50 py-stack-xl transition-colors duration-300 dark:bg-surface-container-high/30">
        <div className="mx-auto max-w-container-max space-y-12 px-margin-mobile md:px-margin-desktop">
          <div className="text-center">
            <h2 className="team-title text-headline-lg text-gray-900 dark:text-on-surface">
              Meet the Leadership
            </h2>
            <p className="team-desc text-body-md text-gray-600 dark:text-on-surface-variant">
              The visionaries behind Vyreka.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-4">
            {leadership.map((person) => (
              <div
                key={person.name}
                className="group text-center text-gray-900 dark:text-on-surface"
              >
                <div className="relative mx-auto mb-4 aspect-square max-w-[240px] overflow-hidden rounded-full border-2 border-gray-200 shadow-md transition-all duration-500 dark:border-outline-variant/20">
                  <img
                    className="h-full w-full object-cover"
                    src={person.image}
                    alt={person.name}
                  />
                  <div className="overlay-gradient absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-0 transition-opacity group-hover:opacity-40" />
                </div>
                <h4 className="card-title text-headline-md">{person.name}</h4>
                <p
                  className={`font-label-sm uppercase tracking-wide ${person.roleColor}`}
                >
                  {person.role}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-4 text-center">
            <Link
              to="/team"
              className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-8 py-3.5 font-label-md text-white transition-all hover:opacity-90 hover:shadow-lg hover:shadow-indigo-600/20 active:scale-95 dark:bg-primary-container dark:hover:shadow-primary-container/20"
            >
              Meet the Full Team Directory
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="overflow-hidden py-stack-xl">
        <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
          <div className="mb-stack-xl text-center">
            <h2 className="testimonials-title text-headline-lg text-gray-900 dark:text-on-surface">
              Voice of the Community
            </h2>
          </div>

          <div className="scrollbar-hide flex flex-nowrap gap-gutter overflow-x-auto pb-8 text-gray-900 dark:text-on-surface">
            {testimonials.map((item) => (
              <div
                key={item.name}
                className="glass-card min-w-[320px] snap-center rounded-3xl border border-gray-100 bg-gray-50/50 p-8 dark:border-white/5 dark:bg-transparent"
              >
                <div className="tracking-stars mb-4 flex gap-1 text-amber-500 dark:text-tertiary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined fill"
                      style={{ fontVariationSettings: '"FILL" 1' }}
                    >
                      star
                    </span>
                  ))}
                </div>

                <p className="testimonial-quote mb-6 text-body-lg italic">
                  “{item.quote}”
                </p>

                <div className="flex items-center gap-4">
                  <div
                    className={`avatar-box flex h-12 w-12 items-center justify-center rounded-full font-bold ${item.accent}`}
                  >
                    {item.initials}
                  </div>
                  <div>
                    <h5 className="card-title font-bold">{item.name}</h5>
                    <p className="testimonial-sub text-label-sm text-gray-500 dark:text-on-surface-variant">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-section bg-gray-50 py-stack-xl transition-colors duration-300 dark:bg-surface-container-low">
        <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
          <div className="grid items-center gap-stack-xl md:grid-cols-2">
            <div className="contact-left-text text-gray-900 dark:text-on-surface">
              <h2 className="mb-6 text-headline-xl font-headline-xl">
                Let's Build the Future Together
              </h2>

              <p className="contact-desc mb-stack-lg text-body-lg text-gray-600 dark:text-on-surface-variant">
                Have questions about our community or want to partner as an
                industry expert? Reach out to us.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="email-icon-box icon-circle flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 dark:bg-primary/10 dark:text-primary">
                    <span className="material-symbols-outlined email-icon">
                      mail
                    </span>
                  </div>
                  <div>
                    <h6 className="card-title font-bold">Email Us</h6>
                    <p className="contact-subp text-gray-600 dark:text-on-surface-variant">
                      vyrekaedtech@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="share-icon-box icon-circle flex h-12 w-12 items-center justify-center rounded-full bg-purple-50 text-purple-600 dark:bg-secondary/10 dark:text-secondary">
                    <span className="material-symbols-outlined share-icon">
                      share
                    </span>
                  </div>
                  <div>
                    <h6 className="card-title font-bold">Social Presence</h6>
                    <div className="social-links mt-1 flex flex-wrap items-center gap-2 text-gray-600 dark:text-on-surface-variant">
                      <a
                        className="transition-colors hover:text-indigo-600 dark:hover:text-primary"
                        href="https://www.linkedin.com/company/vyreka/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        LinkedIn
                      </a>
                      <span>|</span>
                      <a
                        className="transition-colors hover:text-indigo-600 dark:hover:text-primary"
                        href="https://www.instagram.com/_vyreka_/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Instagram
                      </a>
                      <span>|</span>
                      <a
                        className="transition-colors hover:text-indigo-600 dark:hover:text-primary"
                        href="https://chat.whatsapp.com/Lp8HCvoz8NyLS1ynXKLDDz?s=sh&p=a&ilr=2"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-3xl border border-gray-100 bg-white p-8 dark:border-white/5 dark:bg-transparent">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="form-lbl mb-2 block text-label-sm text-gray-600 dark:text-on-surface-variant">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      required
                      className="input-fields h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none transition-all focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:ring-offset-surface dark:border-none dark:bg-surface-container-high dark:focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="form-lbl mb-2 block text-label-sm text-gray-600 dark:text-on-surface-variant">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      required
                      className="input-fields h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none transition-all focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:ring-offset-surface dark:border-none dark:bg-surface-container-high dark:focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="form-lbl mb-2 block text-label-sm text-gray-600 dark:text-on-surface-variant">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input-fields h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none transition-all focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:ring-offset-surface dark:border-none dark:bg-surface-container-high dark:focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="form-lbl mb-2 block text-label-sm text-gray-600 dark:text-on-surface-variant">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="Optional"
                      className="input-fields h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none transition-all focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:ring-offset-surface dark:border-none dark:bg-surface-container-high dark:focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="form-lbl mb-2 block text-label-sm text-gray-600 dark:text-on-surface-variant">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="input-fields w-full rounded-xl border border-gray-200 bg-gray-50 p-4 outline-none transition-all focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:ring-offset-surface dark:border-none dark:bg-surface-container-high dark:focus:ring-primary"
                  />
                </div>

                {submitState.success && (
                  <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700 dark:border-green-500/20 dark:bg-green-500/10 dark:text-green-300">
                    {submitState.success}
                  </div>
                )}

                {submitState.error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
                    {submitState.error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitState.loading}
                  className="form-submit-btn w-full rounded-xl bg-indigo-600 py-4 font-bold text-white transition-all hover:shadow-lg hover:shadow-indigo-600/20 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-primary dark:text-on-primary dark:hover:shadow-primary/20"
                >
                  {submitState.loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
