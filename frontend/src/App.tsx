import { useState, useEffect, useRef, useMemo } from 'react';
import {
  Sun, Moon, ArrowRight, Sparkles, X, Menu, Quote,
  Users, Rocket, Code2, User, Calendar, MapPin,
  Clock, ExternalLink, Mail, Share2, Send, CheckCircle2, AlertCircle
} from 'lucide-react';

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL ||
  import.meta.env.VITE_API_URL ||
  'http://127.0.0.1:8000';

const WHATSAPP_LINK =
  'https://chat.whatsapp.com/Lp8HCvoz8NyLS1ynXKLDDz';

const BACKUP_FORM_URL = 'https://forms.gle/HcPpZE6wxAw3eThp6';

function normalizeImageUrl(rawUrl?: string | null): string {
  if (!rawUrl) return '';
  const trimmed = rawUrl.trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('data:')) {
    return trimmed;
  }
  const forwardSlashes = trimmed.replace(/\\/g, '/');
  return forwardSlashes.startsWith('/') ? forwardSlashes : `/${forwardSlashes}`;
}

function formatEventDate(dateString: string) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

type EventItem = {
  id: number;
  title: string;
  date: string;
  description: string | null;
  venue: string | null;
  poster_url?: string | null;
  registration_link: string | null;
  is_live: boolean;
};

type TeamMemberItem = {
  id: number;
  name: string;
  role: string;
  tag: string;
  bio: string;
  image_url: string;
  linkedin_url: string;
  x_url: string;
};

type GalleryItem = {
  id: number;
  title: string;
  image_url: string;
  event_date: string | null;
  featured_on_home: boolean;
};

type Countdown = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  isExpired: boolean;
};

function getCountdown(dateString: string): Countdown {
  const now = new Date().getTime();
  const target = new Date(dateString).getTime();
  const distance = target - now;

  if (distance <= 0 || Number.isNaN(distance)) {
    return { days: '00', hours: '00', minutes: '00', seconds: '00', isExpired: true };
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  return {
    days: String(days).padStart(2, '0'),
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
    isExpired: false,
  };
}

function VyrekaLogo({ className = 'h-8' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 100 100" className="h-full aspect-square overflow-visible" fill="none">
        <path d="M 15 15 L 35 15 L 48 70 L 35 70 Z" fill="currentColor" className="text-primary" />
        <path d="M 68 15 L 85 15 L 58 85 L 42 85 Z" fill="#00B4D8" />
        <path d="M 32 75 L 60 25 L 50 25 L 68 10 L 75 32 L 68 25 L 42 75 Z" fill="#0077B6" />
        <path d="M 45 65 L 62 25 L 52 25 L 70 10 L 72 18 L 52 65 Z" fill="#00B4D8" />
      </svg>
      <div className="flex flex-col text-left leading-none">
        <span className="font-display text-xl sm:text-2xl font-black tracking-wider text-primary uppercase">
          VYREKA
        </span>
        <span className="text-[7px] sm:text-[8px] font-mono font-bold tracking-widest text-secondary uppercase -mt-0.5">
          Bridging Education To Industry
        </span>
      </div>
    </div>
  );
}

function LinkedinIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#0A66C2">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.64a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26Z" />
    </svg>
  );
}

function XSocialIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function WhatsappIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#25D366">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c4.55 0 8.25 3.7 8.25 8.25 0 4.55-3.7 8.25-8.25 8.25-1.48 0-2.93-.39-4.2-1.14l-.3-.18-3.12.82.83-3.04-.2-.32a8.19 8.19 0 0 1-1.26-4.38c0-4.55 3.7-8.26 8.25-8.26m4.53 11.23c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.12-.17.25-.64.81-.79.98-.15.17-.3.19-.55.07-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.45-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.45.06-.69.32-.24.25-.91.89-.91 2.17 0 1.28.93 2.52 1.06 2.69.13.17 1.83 2.8 4.44 3.93.62.27 1.11.43 1.49.55.63.2 1.2.17 1.65.1.5-.07 1.53-.62 1.74-1.22.22-.6.22-1.12.15-1.22-.06-.11-.22-.17-.47-.3Z" />
    </svg>
  );
}

function InstagramIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <div className={`relative rounded-lg overflow-hidden flex items-center justify-center p-0.5 bg-gradient-to-tr from-[#FFDC80] via-[#F56040] to-[#C13584] ${className}`}>
      <svg className="w-full h-full text-white shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    </div>
  );
}

function MemberAvatar({
  src,
  name,
  className = 'w-16 h-16',
  iconSize = 'w-8 h-8',
}: {
  src?: string;
  name: string;
  className?: string;
  iconSize?: string;
}) {
  const [failed, setFailed] = useState(false);
  const resolvedSrc = normalizeImageUrl(src);

  useEffect(() => {
    setFailed(false);
  }, [resolvedSrc]);

  if (!resolvedSrc || failed) {
    return (
      <div
        className={`${className} rounded-full mx-auto bg-secondary/15 border-2 border-accent/40 flex items-center justify-center text-primary shadow-xs shrink-0`}
      >
        <User className={`${iconSize} opacity-90`} />
      </div>
    );
  }

  return (
    <img
      src={resolvedSrc}
      alt={name}
      onError={() => setFailed(true)}
      className={`${className} rounded-full mx-auto object-cover border-2 border-accent/50 shadow-sm shrink-0`}
    />
  );
}

function EventCountdown({ date }: { date: string }) {
  const [countdown, setCountdown] = useState<Countdown>(() => getCountdown(date));

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdown(date));
    }, 1000);
    return () => clearInterval(interval);
  }, [date]);

  if (countdown.isExpired) {
    return (
      <div className="rounded-xl border border-borderColor bg-background/70 px-3 py-2.5 text-center font-mono text-xs font-bold uppercase tracking-wider text-secondary">
        Registration Closed / Session Ended
      </div>
    );
  }

  const units = [
    { label: 'Days', value: countdown.days },
    { label: 'Hrs', value: countdown.hours },
    { label: 'Mins', value: countdown.minutes },
    { label: 'Secs', value: countdown.seconds },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 rounded-xl border border-accent/25 bg-background/80 p-2.5 text-center">
      {units.map((u) => (
        <div key={u.label}>
          <div className="font-mono text-base sm:text-lg font-extrabold text-accent leading-none">
            {u.value}
          </div>
          <div className="font-mono text-[9px] uppercase tracking-wider text-secondary mt-1">
            {u.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const duration = 1500;
          const stepTime = 20;
          const steps = duration / stepTime;
          const increment = target / steps;

          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, stepTime);
        }
      },
      { threshold: 0.3 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return (
    <span ref={elementRef} className="font-mono">
      {count}
      {suffix}
    </span>
  );
}

export default function App() {
  const [theme, setTheme] = useState<string>(localStorage.getItem('theme') || 'dark');
  const [view, setView] = useState<string>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const [teamMembers, setTeamMembers] = useState<TeamMemberItem[]>([]);
  const [teamLoading, setTeamLoading] = useState<boolean>(true);

  const [events, setEvents] = useState<EventItem[]>([]);
  const [eventsLoading, setEventsLoading] = useState<boolean>(true);
  const [eventsError, setEventsError] = useState<string | null>(null);

  const [galleryImages, setGalleryImages] = useState<GalleryItem[]>([]);
  const [galleryLoading, setGalleryLoading] = useState<boolean>(true);

  const [contactForm, setContactForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    mobile: '',
    message: '',
  });
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactFeedback, setContactFeedback] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  useEffect(() => {
    let active = true;
    setTeamLoading(true);
    fetch(`${BACKEND_URL}/api/team/`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load team');
        return res.json();
      })
      .then((data: TeamMemberItem[]) => {
        if (active && Array.isArray(data)) {
          setTeamMembers(data);
        }
      })
      .catch((err) => console.error('Team fetch error:', err))
      .finally(() => {
        if (active) setTeamLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;
    setEventsLoading(true);
    setEventsError(null);
    fetch(`${BACKEND_URL}/api/events/`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to load events');
        return data;
      })
      .then((data) => {
        if (active && Array.isArray(data.events)) {
          setEvents(data.events);
        }
      })
      .catch((err) => {
        console.error('Events fetch error:', err);
        if (active) {
          setEventsError(err instanceof Error ? err.message : 'Could not fetch events.');
        }
      })
      .finally(() => {
        if (active) setEventsLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;
    setGalleryLoading(true);
    fetch(`${BACKEND_URL}/api/gallery/`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load gallery');
        return res.json();
      })
      .then((data) => {
        if (active && Array.isArray(data.images)) {
          setGalleryImages(data.images);
        }
      })
      .catch((err) => console.error('Gallery fetch error:', err))
      .finally(() => {
        if (active) setGalleryLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const { upcomingEvents, pastEvents } = useMemo(() => {
    const now = Date.now();
    const upcoming: EventItem[] = [];
    const past: EventItem[] = [];

    events.forEach((ev) => {
      const eventTime = new Date(ev.date).getTime();
      if (ev.is_live || eventTime >= now) {
        upcoming.push(ev);
      } else {
        past.push(ev);
      }
    });

    upcoming.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    past.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return { upcomingEvents: upcoming, pastEvents: past };
  }, [events]);

  const homepageGallery = useMemo(() => {
    const featured = galleryImages.filter((img) => img.featured_on_home);
    const source = featured.length > 0 ? featured : galleryImages;
    return source.slice(0, 6);
  }, [galleryImages]);

  const homepageTeam = useMemo(() => teamMembers.slice(0, 6), [teamMembers]);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitting(true);
    setContactFeedback(null);

    try {
      const res = await fetch(`${BACKEND_URL}/api/contact/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send message.');

      setContactFeedback({
        type: 'success',
        text: data.message || 'Your message has been sent successfully!',
      });
      setContactForm({ first_name: '', last_name: '', email: '', mobile: '', message: '' });
    } catch (err) {
      setContactFeedback({
        type: 'error',
        text: err instanceof Error ? err.message : 'Something went wrong. Please try again.',
      });
    } finally {
      setContactSubmitting(false);
    }
  };

  return (
    <div className="bg-background text-primary min-h-screen antialiased transition-colors duration-300 flex flex-col justify-between selection:bg-accent/20 selection:text-accent font-sans">
      {/* 1. NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-borderColor transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <button
            onClick={() => {
              setView('home');
              setMobileMenuOpen(false);
            }}
            className="bg-transparent border-none cursor-pointer p-0"
          >
            <VyrekaLogo className="h-9 sm:h-11" />
          </button>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-secondary">
            {[
              { id: 'home', label: 'Home' },
              { id: 'events', label: 'Events' },
              { id: 'gallery', label: 'Gallery' },
              { id: 'aboutus', label: 'About Us' },
              { id: 'core-team', label: 'Core Team' },
              { id: 'contactus', label: 'Contact Us' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`transition-colors cursor-pointer hover:text-primary ${
                  view === item.id ? 'text-accent font-bold' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-borderColor hover:bg-card text-secondary hover:text-primary transition-all duration-200 cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center px-6 h-11 bg-accent text-white font-bold rounded-xl text-sm hover:opacity-90 transition-all cursor-pointer shadow-lg shadow-accent/20"
            >
              Join Now
            </a>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-borderColor text-secondary"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg border border-borderColor text-primary"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-b border-borderColor bg-card px-6 py-6 space-y-4">
            <div className="flex flex-col gap-3 font-medium">
              {[
                { id: 'home', label: 'Home' },
                { id: 'events', label: 'Events' },
                { id: 'gallery', label: 'Gallery' },
                { id: 'aboutus', label: 'About Us' },
                { id: 'core-team', label: 'Core Team' },
                { id: 'contactus', label: 'Contact Us' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setView(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left py-2 text-base border-b border-borderColor/40 ${
                    view === item.id ? 'text-accent font-bold' : 'text-secondary'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="w-full h-12 bg-accent text-white font-bold rounded-xl text-sm flex items-center justify-center mt-4"
            >
              Join Now
            </a>
          </div>
        )}
      </header>

      {/* MAIN VIEWPORT */}
      <div className="grow">
        {/* ================= HOME VIEW ================= */}
        {view === 'home' && (
          <main>
            {/* HERO BANNER */}
            <section className="relative overflow-hidden pt-16 pb-20 sm:pt-28 sm:pb-36 bg-gradient-to-b from-accent/15 via-accent/5 to-background transition-colors duration-300">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[800px] h-[350px] sm:h-[500px] bg-gradient-to-tr from-[#FF5A1F]/25 to-[#FF8A00]/20 blur-[120px] pointer-events-none rounded-full" />
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[300px] h-[150px] bg-accent/20 blur-[90px] pointer-events-none rounded-full" />

              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 text-accent font-mono text-xs font-bold tracking-wider uppercase mx-auto shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>THE DECCAN DEVELOPER HUB</span>
                </div>

                <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] max-w-5xl mx-auto">
                  Bridging the Gap Between <br className="hidden sm:inline" />
                  <span className="text-accent">Education</span> and{' '}
                  <span className="text-accent">Industry</span>.
                </h1>

                <p className="text-base sm:text-xl text-secondary max-w-2xl mx-auto font-normal leading-relaxed">
                  Vyreka is an engine for engineering talent. We empower student builders with
                  industry mentors, real-world project deployments, and peer-to-peer technical
                  acceleration.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 h-14 bg-accent text-white font-bold rounded-2xl shadow-xl shadow-accent/25 hover:opacity-95 transition-all cursor-pointer"
                  >
                    Become a Member <ArrowRight className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => setView('events')}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 h-14 border border-borderColor hover:bg-card/80 backdrop-blur-md text-primary font-bold rounded-2xl transition-colors cursor-pointer"
                  >
                    View Upcoming Sprints
                  </button>
                </div>
              </div>
            </section>

            {/* STATS SECTION */}
            <section className="border-y border-borderColor bg-card/40 py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  {[
                    { target: 120, label: 'Community Members', suffix: '+' },
                    { target: 7, label: 'Hands-on Workshops', suffix: '+' },
                    { target: 10, label: 'Industry Experts', suffix: '' },
                    { target: 5, label: 'Flagship Events', suffix: '' },
                  ].map((stat, idx) => (
                    <div key={idx} className="space-y-1">
                      <p className="font-mono text-4xl sm:text-5xl font-extrabold text-accent tracking-tight">
                        <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                      </p>
                      <p className="text-xs font-bold tracking-widest uppercase text-secondary font-mono">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* WHY CHOOSE VYREKA? */}
            <section className="py-20 sm:py-28">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
                  <span className="font-mono text-xs font-bold tracking-widest uppercase text-accent">
                    THE VYREKA ADVANTAGE
                  </span>
                  <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight">
                    Why Choose Vyreka?
                  </h2>
                  <p className="text-secondary text-sm sm:text-base">
                    We throw out textbook theory and replace it with production code, production
                    builds, and real industry practices.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      icon: <Code2 className="w-6 h-6 text-accent" />,
                      title: 'Production-First Mindset',
                      desc: 'Stop building tutorial projects. Deploy real software stacks, configure cloud servers, and write clean maintainable code.',
                    },
                    {
                      icon: <Users className="w-6 h-6 text-accent" />,
                      title: 'Expert Mentorship',
                      desc: 'Direct access to software engineers and tech leads who guide code reviews, system architecture, and career roadmaps.',
                    },
                    {
                      icon: <Rocket className="w-6 h-6 text-accent" />,
                      title: 'Hackathons & Build-Sprints',
                      desc: 'High-energy 48-hour sprints to build, test, and present solutions in front of regional ecosystem leaders.',
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-card border border-borderColor rounded-3xl p-8 space-y-4 hover:border-accent/40 transition-colors group"
                    >
                      <div className="p-3.5 bg-background border border-borderColor rounded-2xl w-fit group-hover:border-accent/30 transition-colors">
                        {item.icon}
                      </div>
                      <h3 className="font-display text-xl font-bold">{item.title}</h3>
                      <p className="text-sm text-secondary leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* THE VYREKA JOURNEY (GALLERY PREVIEW - CLEAN ZOOM, NO CAPTIONS) */}
            <section className="py-20 sm:py-28 bg-card/20 border-y border-borderColor">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
                <div className="text-center space-y-4 max-w-2xl mx-auto">
                  <span className="font-mono text-xs font-bold tracking-widest uppercase text-accent">
                    MILESTONES & TIMELINE
                  </span>
                  <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight">
                    The Vyreka Journey
                  </h2>
                  <p className="text-secondary text-sm sm:text-base">
                    Explore our latest community milestones and recent events.
                  </p>
                </div>

                {galleryLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((n) => (
                      <div
                        key={n}
                        className="h-64 rounded-2xl bg-card border border-borderColor animate-pulse"
                      />
                    ))}
                  </div>
                ) : homepageGallery.length === 0 ? (
                  <div className="bg-card border border-borderColor rounded-2xl p-10 text-center space-y-2">
                    <p className="font-display text-lg font-bold">Gallery Moments Coming Soon</p>
                    <p className="text-xs font-mono text-secondary">
                      Add past event photos in the Django Admin panel under Gallery Images.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="block md:hidden overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none">
                      <div className="flex gap-3 w-max">
                        {homepageGallery.map((img) => (
                          <div
                            key={img.id}
                            onClick={() => setSelectedImage(img)}
                            className="w-[260px] snap-center bg-card border border-borderColor rounded-2xl overflow-hidden shrink-0 cursor-pointer hover:border-accent/50 transition-all h-56 group"
                          >
                            <img
                              src={normalizeImageUrl(img.image_url)}
                              alt={img.title || 'Vyreka Gallery'}
                              loading="lazy"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="hidden md:grid md:grid-cols-3 gap-6">
                      {homepageGallery.map((img) => (
                        <div
                          key={img.id}
                          onClick={() => setSelectedImage(img)}
                          className="bg-card border border-borderColor rounded-2xl overflow-hidden cursor-pointer hover:border-accent/50 transition-all duration-300 h-64 group"
                        >
                          <img
                            src={normalizeImageUrl(img.image_url)}
                            alt={img.title || 'Vyreka Gallery'}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      ))}
                    </div>
                  </>
                )}

                <div className="flex justify-center">
                  <button
                    onClick={() => setView('gallery')}
                    className="inline-flex items-center gap-2 px-8 h-12 bg-card border border-borderColor hover:border-accent text-primary hover:text-accent font-bold rounded-xl transition-all cursor-pointer shadow-md"
                  >
                    View More Moments <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>

            {/* CORE TEAM PREVIEW */}
            <section className="py-20 sm:py-28">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
                <div className="text-center space-y-4 max-w-2xl mx-auto">
                  <span className="font-mono text-xs font-bold tracking-widest uppercase text-accent">
                    THE PEOPLE BEHIND VYREKA
                  </span>
                  <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight">
                    Core Team
                  </h2>
                  <p className="text-secondary text-sm sm:text-base">
                    Engineers, community builders, and student leaders driving the Vyreka mission
                    forward.
                  </p>
                </div>

                {teamLoading ? (
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <div
                        key={n}
                        className="h-44 rounded-2xl bg-card border border-borderColor animate-pulse"
                      />
                    ))}
                  </div>
                ) : homepageTeam.length === 0 ? (
                  <p className="text-center text-sm font-mono text-secondary">
                    No team members found in database.
                  </p>
                ) : (
                  <>
                    <div className="block md:hidden overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none">
                      <div className="flex gap-4 w-max">
                        {homepageTeam.map((member) => (
                          <div
                            key={member.id}
                            className="w-[240px] snap-center bg-card border border-borderColor rounded-2xl p-5 text-center space-y-4 shrink-0"
                          >
                            <MemberAvatar
                              src={member.image_url}
                              name={member.name}
                              className="w-20 h-20"
                              iconSize="w-10 h-10"
                            />
                            <div>
                              <h3 className="font-display font-bold text-base">{member.name}</h3>
                              <p className="text-xs font-mono text-accent mt-0.5">{member.role}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="hidden md:grid md:grid-cols-6 gap-4">
                      {homepageTeam.map((member) => (
                        <div
                          key={member.id}
                          className="bg-card border border-borderColor rounded-2xl p-5 text-center space-y-3 hover:border-accent/40 transition-colors"
                        >
                          <MemberAvatar
                            src={member.image_url}
                            name={member.name}
                            className="w-20 h-20"
                            iconSize="w-9 h-9"
                          />
                          <div>
                            <h3 className="font-display font-bold text-sm leading-tight">
                              {member.name}
                            </h3>
                            <p className="text-[11px] font-mono text-accent mt-1 leading-snug">
                              {member.role}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                <div className="flex justify-center">
                  <button
                    onClick={() => setView('core-team')}
                    className="inline-flex items-center gap-2 px-8 h-12 bg-card border border-borderColor hover:border-accent text-primary hover:text-accent font-bold rounded-xl transition-all cursor-pointer"
                  >
                    View More Members ({teamMembers.length}) <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>

            {/* TESTIMONIALS */}
            <section className="py-20 sm:py-28 bg-card/30 border-t border-borderColor">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
                <div className="text-center space-y-4 max-w-2xl mx-auto">
                  <span className="font-mono text-xs font-bold tracking-widest uppercase text-accent">
                    BUILDER VOICES
                  </span>
                  <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight">
                    Community Feedback
                  </h2>
                  <p className="text-secondary text-sm sm:text-base">
                    What engineers and mentors say about building with Vyreka.
                  </p>
                </div>

                <div className="flex md:grid md:grid-cols-2 gap-6 md:gap-8 overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory scrollbar-none -mx-4 px-4 md:mx-0 md:px-0">
                  {[
                    {
                      quote:
                        'Vyreka filled the void that college engineering curriculum missed. Here I built real production web apps, debugged AWS deployment pipelines, and met my current co-founders.',
                      author: 'Siddharth Rao',
                      role: 'Full-Stack Engineer @ TechCorp',
                    },
                    {
                      quote:
                        'The energy in the 48-hour build sessions is electric. You get direct code feedback from experienced devs who help you ship cleanly instead of just getting a certificate.',
                      author: 'Neha Kapoor',
                      role: 'Frontend Developer & Open Source Contributor',
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-card border border-borderColor rounded-3xl p-6 sm:p-8 space-y-4 relative w-[85vw] max-w-[340px] md:w-full md:max-w-none shrink-0 snap-center flex flex-col justify-between"
                    >
                      <Quote className="w-8 h-8 text-accent/30 shrink-0" />
                      <p className="text-sm sm:text-base text-secondary leading-relaxed grow">
                        {item.quote}
                      </p>
                      <div className="pt-4 border-t border-borderColor/50 shrink-0">
                        <p className="font-bold text-sm">{item.author}</p>
                        <p className="text-xs font-mono text-accent">{item.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </main>
        )}

        {/* ================= EVENTS VIEW (UPCOMING WITH POSTER + PAST) ================= */}
        {view === 'events' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-14">
            <div className="space-y-3 max-w-2xl">
              <span className="font-mono text-xs font-bold tracking-widest uppercase text-accent">
                COMMUNITY SPRINTS & WORKSHOPS
              </span>
              <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight">
                Vyreka Events
              </h1>
              <p className="text-secondary text-base">
                Explore upcoming hands-on workshops and revisit our past community sessions. Click
                any event card for full details.
              </p>
            </div>

            {eventsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="h-80 rounded-3xl bg-card border border-borderColor animate-pulse"
                  />
                ))}
              </div>
            ) : eventsError ? (
              <div className="bg-card border border-red-500/30 rounded-2xl p-8 text-center space-y-2">
                <p className="text-red-400 font-bold">{eventsError}</p>
                <p className="text-xs font-mono text-secondary">
                  Ensure the Django server is running at {BACKEND_URL}
                </p>
              </div>
            ) : events.length === 0 ? (
              <div className="bg-card border border-borderColor rounded-2xl p-12 text-center space-y-2">
                <p className="font-display text-xl font-bold">No Events Posted Yet</p>
                <p className="text-sm text-secondary">
                  Add upcoming or past events via the Django Admin panel.
                </p>
              </div>
            ) : (
              <>
                {/* UPCOMING / LIVE EVENTS */}
                <section className="space-y-6">
                  <div className="flex items-center justify-between border-b border-borderColor pb-4">
                    <h2 className="font-display text-2xl sm:text-3xl font-bold flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                      Upcoming & Live Events
                    </h2>
                    <span className="font-mono text-xs text-secondary">
                      {upcomingEvents.length} {upcomingEvents.length === 1 ? 'Event' : 'Events'}
                    </span>
                  </div>

                  {upcomingEvents.length === 0 ? (
                    <div className="bg-card/50 border border-borderColor rounded-2xl p-8 text-center text-sm text-secondary">
                      No upcoming events scheduled right now. Stay tuned in our WhatsApp community!
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {upcomingEvents.map((event) => {
                        const posterSrc = normalizeImageUrl(event.poster_url);
                        return (
                          <div
                            key={event.id}
                            onClick={() => setSelectedEvent(event)}
                            className="bg-card border border-accent/35 rounded-3xl overflow-hidden flex flex-col justify-between cursor-pointer hover:border-accent transition-all hover:-translate-y-1 shadow-lg shadow-accent/5 group"
                          >
                            <div>
                              {posterSrc && (
                                <div className="w-full aspect-[4/3] overflow-hidden border-b border-borderColor bg-background">
                                  <img
                                    src={posterSrc}
                                    alt={event.title}
                                    loading="lazy"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                  />
                                </div>
                              )}

                              <div className="p-6 pb-4 space-y-3">
                                <div className="flex items-center justify-between gap-2">
                                  <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-accent">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {formatEventDate(event.date)}
                                  </span>
                                  <span className="px-2.5 py-0.5 rounded-full bg-accent/15 border border-accent/30 text-accent font-mono text-[10px] font-bold uppercase">
                                    Live
                                  </span>
                                </div>

                                <h3 className="font-display text-xl font-bold leading-snug">
                                  {event.title}
                                </h3>

                                <p className="text-sm text-secondary line-clamp-3 leading-relaxed">
                                  {event.description?.trim() ||
                                    'Join this Vyreka community session for hands-on learning and networking.'}
                                </p>
                              </div>
                            </div>

                            <div className="p-6 pt-2 space-y-4">
                              <EventCountdown date={event.date} />

                              <div className="flex items-center gap-2 text-xs font-mono text-secondary">
                                <MapPin className="w-4 h-4 text-accent shrink-0" />
                                <span className="truncate">{event.venue || 'TBA'}</span>
                              </div>

                              {event.registration_link ? (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    window.open(
                                      event.registration_link!,
                                      '_blank',
                                      'noopener,noreferrer'
                                    );
                                  }}
                                  className="w-full h-11 rounded-xl bg-accent text-white font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer"
                                >
                                  Register Now <ExternalLink className="w-4 h-4" />
                                </button>
                              ) : (
                                <button
                                  disabled
                                  className="w-full h-11 rounded-xl border border-borderColor bg-background/60 text-secondary font-mono text-xs font-bold flex items-center justify-center gap-2 cursor-not-allowed"
                                >
                                  <Clock className="w-3.5 h-3.5" /> Registration Opening Soon
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </section>

                {/* PAST EVENTS */}
                <section className="space-y-6">
                  <div className="flex items-center justify-between border-b border-borderColor pb-4">
                    <h2 className="font-display text-2xl sm:text-3xl font-bold">Past Events</h2>
                    <span className="font-mono text-xs text-secondary">
                      {pastEvents.length} Archived
                    </span>
                  </div>

                  {pastEvents.length === 0 ? (
                    <p className="text-sm text-secondary">No past events archived yet.</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {pastEvents.map((event) => (
                        <div
                          key={event.id}
                          onClick={() => setSelectedEvent(event)}
                          className="bg-card border border-borderColor rounded-3xl p-6 flex flex-col justify-between space-y-6 cursor-pointer hover:border-accent/40 transition-all hover:-translate-y-1"
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-between gap-2">
                              <span className="inline-flex items-center gap-1.5 font-mono text-xs text-secondary">
                                <Calendar className="w-3.5 h-3.5 text-accent" />
                                {formatEventDate(event.date)}
                              </span>
                              <span className="px-2.5 py-0.5 rounded-full bg-background border border-borderColor text-secondary font-mono text-[10px] font-bold uppercase">
                                Past Event
                              </span>
                            </div>

                            <h3 className="font-display text-xl font-bold leading-snug">
                              {event.title}
                            </h3>

                            <p className="text-sm text-secondary line-clamp-3 leading-relaxed">
                              {event.description?.trim() ||
                                'Completed Vyreka community workshop and builder meetup.'}
                            </p>
                          </div>

                          <div className="pt-3 border-t border-borderColor/60 flex items-center justify-between text-xs font-mono text-secondary">
                            <span className="flex items-center gap-1.5 truncate">
                              <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
                              <span className="truncate">{event.venue || 'Hyderabad'}</span>
                            </span>
                            <span className="text-accent font-bold shrink-0">Details →</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              </>
            )}
          </div>
        )}

        {/* ================= GALLERY VIEW ================= */}
        {view === 'gallery' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-10">
            <div className="space-y-3 max-w-2xl">
              <span className="font-mono text-xs font-bold tracking-widest uppercase text-accent">
                FULL ARCHIVE
              </span>
              <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight">
                Event Gallery
              </h1>
              <p className="text-secondary text-base">
                Browse through captured moments across Vyreka hackathons, workshops, and meetups.
              </p>
            </div>

            {galleryLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div
                    key={n}
                    className="aspect-[4/3] sm:aspect-auto sm:h-64 rounded-2xl bg-card border border-borderColor animate-pulse"
                  />
                ))}
              </div>
            ) : galleryImages.length === 0 ? (
              <div className="bg-card border border-borderColor rounded-3xl p-12 text-center space-y-3">
                <p className="font-display text-xl font-bold">No Gallery Photos Uploaded Yet</p>
                <p className="text-sm text-secondary max-w-md mx-auto">
                  Log into the Django Admin panel and add entries under{' '}
                  <span className="font-mono text-accent">Gallery Images</span> to showcase past
                  event photos here.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
                {galleryImages.map((img) => (
                  <div
                    key={img.id}
                    onClick={() => setSelectedImage(img)}
                    className="bg-card border border-borderColor rounded-2xl overflow-hidden cursor-pointer hover:border-accent/50 transition-all aspect-[4/3] sm:aspect-auto sm:h-64 group"
                  >
                    <img
                      src={normalizeImageUrl(img.image_url)}
                      alt={img.title || 'Vyreka Gallery'}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= CORE TEAM VIEW ================= */}
        {view === 'core-team' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-12">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <span className="font-mono text-xs font-bold tracking-widest uppercase text-accent">
                THE PEOPLE BEHIND VYREKA
              </span>
              <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight">
                Meet the Core Team
              </h1>
              <p className="text-secondary text-base">
                The builders, organizers, and student leaders shaping the Vyreka ecosystem.
              </p>
            </div>

            {teamLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <div
                    key={n}
                    className="h-80 rounded-3xl bg-card border border-borderColor animate-pulse"
                  />
                ))}
              </div>
            ) : teamMembers.length === 0 ? (
              <div className="bg-card border border-borderColor rounded-2xl p-12 text-center text-secondary">
                No team members added yet. Add them in the Django Admin panel.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="bg-card border border-borderColor rounded-3xl p-6 flex flex-col justify-between space-y-5 hover:border-accent/40 transition-all"
                  >
                    <div className="space-y-4 text-center">
                      <MemberAvatar
                        src={member.image_url}
                        name={member.name}
                        className="w-24 h-24"
                        iconSize="w-11 h-11"
                      />

                      <div className="space-y-1.5">
                        <h3 className="font-display text-lg font-bold">{member.name}</h3>
                        <p className="font-mono text-xs font-bold text-accent uppercase tracking-wider">
                          {member.role}
                        </p>
                        {member.tag && (
                          <span className="inline-block px-2.5 py-0.5 rounded-md bg-background border border-borderColor font-mono text-[11px] text-secondary">
                            {member.tag}
                          </span>
                        )}
                      </div>

                      {member.bio && (
                        <p className="text-xs text-secondary leading-relaxed line-clamp-4">
                          {member.bio}
                        </p>
                      )}
                    </div>

                    {(member.linkedin_url || member.x_url) && (
                      <div className="pt-4 border-t border-borderColor/60 flex items-center justify-center gap-3">
                        {member.linkedin_url && (
                          <a
                            href={member.linkedin_url}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-xl bg-background border border-borderColor hover:border-accent/40 transition-colors"
                            title="LinkedIn"
                          >
                            <LinkedinIcon className="w-4 h-4" />
                          </a>
                        )}
                        {member.x_url && (
                          <a
                            href={member.x_url}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-xl bg-background border border-borderColor hover:border-accent/40 text-secondary hover:text-primary transition-colors"
                            title="X (Twitter)"
                          >
                            <XSocialIcon className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= ABOUT US VIEW ================= */}
        {view === 'aboutus' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-14">
            <section className="space-y-5">
              <span className="font-mono text-xs font-bold tracking-widest uppercase text-accent">
                OUR MISSION
              </span>
              <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight">
                About Vyreka
              </h1>
              <p className="text-base sm:text-lg text-secondary leading-relaxed">
                At Vyreka, we believe that learning should go beyond classrooms and textbooks. Our
                mission is to bridge the gap between academic education and real-world industry
                expectations by creating opportunities for students and professionals to learn,
                connect, and grow.
              </p>
              <p className="text-base sm:text-lg text-secondary leading-relaxed">
                Vyreka is more than just a community—it&apos;s a career accelerator built for those
                who want to turn knowledge into action. We provide a platform where individuals can
                gain practical experience, develop industry-relevant skills, and build meaningful
                professional relationships that support long-term career growth.
              </p>
              <p className="text-base sm:text-lg text-secondary leading-relaxed">
                Through hands-on workshops, interactive lab sessions, industry visits, mentorship
                programs, and networking events, we help our members gain direct exposure to the
                professional world. Our focus is on empowering individuals with both technical
                expertise and essential soft skills such as communication, leadership,
                collaboration, and problem-solving.
              </p>
              <p className="text-base sm:text-lg text-secondary leading-relaxed">
                Whether you&apos;re a student preparing for your first opportunity or a professional
                looking to stay ahead in a rapidly evolving industry, Vyreka offers the guidance,
                resources, and community needed to accelerate your journey.
              </p>
            </section>

            <section className="bg-card border border-borderColor rounded-3xl p-8 space-y-3">
              <span className="font-mono text-xs font-bold tracking-widest uppercase text-accent">
                OUR VISION
              </span>
              <p className="font-display text-xl sm:text-2xl font-bold leading-snug">
                To create a future where every learner has access to practical industry experience,
                mentorship, and opportunities that enable them to thrive in their careers.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="font-display text-2xl sm:text-3xl font-bold">What We Offer</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    title: 'Practical Learning',
                    desc: 'Hands-on workshops and practical learning experiences.',
                  },
                  {
                    title: 'Expert Guidance',
                    desc: 'Industry mentorship and expert guidance.',
                  },
                  {
                    title: 'Corporate Exposure',
                    desc: 'Corporate visits and real-world industry exposure.',
                  },
                  {
                    title: 'Strategic Connections',
                    desc: 'Professional networking opportunities.',
                  },
                  {
                    title: 'Career Readiness',
                    desc: 'Career readiness and skill development programs.',
                  },
                  {
                    title: 'Focused Ecosystem',
                    desc: 'A supportive community focused on growth and innovation.',
                  },
                ].map((offer) => (
                  <div
                    key={offer.title}
                    className="bg-card border border-borderColor rounded-2xl p-6 space-y-1.5"
                  >
                    <h3 className="font-display font-bold text-lg text-accent">{offer.title}</h3>
                    <p className="text-sm text-secondary">{offer.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="text-center pt-4">
              <button
                onClick={() => setView('core-team')}
                className="inline-flex items-center gap-2 px-8 h-13 py-3.5 bg-accent text-white font-bold rounded-2xl shadow-lg shadow-accent/20 hover:opacity-90 transition-all cursor-pointer"
              >
                Meet the Core Team <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= CONTACT US VIEW ================= */}
        {view === 'contactus' && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-12">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="font-mono text-xs font-bold tracking-widest uppercase text-accent">
                REACH OUT
              </span>
              <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight">
                Get in Touch
              </h1>
              <p className="text-secondary text-base">
                Have questions about upcoming tracks, speaking, or partnerships? Drop us a line.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
              <div className="space-y-6">
                <h2 className="font-display text-2xl font-bold">Let&apos;s Connect</h2>
                <p className="text-secondary text-sm sm:text-base leading-relaxed">
                  We actively monitor our inbox daily. Send your message over and our core
                  engineering mentors or operations team will loop back within 24 hours.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 bg-card border border-borderColor rounded-2xl p-4">
                    <div className="p-3 rounded-xl bg-accent/10 text-accent">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">Email Support</p>
                      <p className="text-xs font-mono text-secondary">mismailahmed46@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 bg-card border border-borderColor rounded-2xl p-4">
                    <div className="p-3 rounded-xl bg-accent/10 text-accent">
                      <Share2 className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">Social Presence</p>
                      <div className="flex flex-wrap gap-3 text-xs font-mono text-secondary mt-1">
                        <a
                          href="https://www.linkedin.com/company/vyreka/"
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-accent transition-colors"
                        >
                          LinkedIn
                        </a>
                        <span>|</span>
                        <a
                          href="https://www.instagram.com/_vyreka_"
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-accent transition-colors"
                        >
                          Instagram
                        </a>
                        <span>|</span>
                        <a
                          href={WHATSAPP_LINK}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-accent transition-colors"
                        >
                          WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-borderColor rounded-3xl p-6 sm:p-8 space-y-5">
                {contactFeedback && (
                  <div className="space-y-3">
                    <div
                      className={`p-4 rounded-xl text-sm flex items-start gap-2.5 ${
                        contactFeedback.type === 'success'
                          ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                          : 'bg-red-500/10 border border-red-500/30 text-red-400'
                      }`}
                    >
                      {contactFeedback.type === 'success' ? (
                        <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      )}
                      <span>{contactFeedback.text}</span>
                    </div>

                    {contactFeedback.type === 'error' && (
                      <div className="rounded-xl border border-dashed border-borderColor p-4 text-center space-y-1.5">
                        <p className="text-xs text-secondary">
                          Prefer submitting directly via Google Forms?
                        </p>
                        <a
                          href={BACKUP_FORM_URL}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-mono font-bold text-accent underline"
                        >
                          Open Backup Contact Form <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>
                )}

                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-xs text-secondary mb-1.5">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={contactForm.first_name}
                        onChange={(e) =>
                          setContactForm((p) => ({ ...p, first_name: e.target.value }))
                        }
                        className="w-full h-11 px-4 rounded-xl bg-background border border-borderColor text-primary text-sm outline-none focus:border-accent"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-xs text-secondary mb-1.5">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={contactForm.last_name}
                        onChange={(e) =>
                          setContactForm((p) => ({ ...p, last_name: e.target.value }))
                        }
                        className="w-full h-11 px-4 rounded-xl bg-background border border-borderColor text-primary text-sm outline-none focus:border-accent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-secondary mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm((p) => ({ ...p, email: e.target.value }))}
                      className="w-full h-11 px-4 rounded-xl bg-background border border-borderColor text-primary text-sm outline-none focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-secondary mb-1.5">
                      Mobile Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={contactForm.mobile}
                      onChange={(e) => setContactForm((p) => ({ ...p, mobile: e.target.value }))}
                      className="w-full h-11 px-4 rounded-xl bg-background border border-borderColor text-primary text-sm outline-none focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-secondary mb-1.5">
                      Your Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={contactForm.message}
                      onChange={(e) => setContactForm((p) => ({ ...p, message: e.target.value }))}
                      className="w-full p-4 rounded-xl bg-background border border-borderColor text-primary text-sm outline-none focus:border-accent"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={contactSubmitting}
                    className="w-full h-12 rounded-xl bg-accent text-white font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 cursor-pointer"
                  >
                    {contactSubmitting ? 'Sending...' : 'Send Message'}
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FULLSCREEN GALLERY IMAGE MODAL */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-5xl w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              aria-label="Close image"
              className="mb-3 self-end rounded-full bg-white/10 hover:bg-accent text-white p-2.5 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={normalizeImageUrl(selectedImage.image_url)}
              alt={selectedImage.title || 'Vyreka Gallery'}
              className="max-w-full max-h-[82vh] rounded-2xl object-contain shadow-2xl border border-white/10"
            />
          </div>
        </div>
      )}

      {/* EVENT DETAILS MODAL */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-card border border-borderColor p-6 sm:p-8 shadow-2xl space-y-5"
          >
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute right-5 top-5 z-10 p-2 rounded-full bg-background/90 border border-borderColor text-secondary hover:text-primary cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {normalizeImageUrl(selectedEvent.poster_url) && (
              <div className="w-full rounded-2xl overflow-hidden border border-borderColor bg-background">
                <img
                  src={normalizeImageUrl(selectedEvent.poster_url)}
                  alt={selectedEvent.title}
                  className="w-full max-h-72 object-contain mx-auto"
                />
              </div>
            )}

            <div className="flex items-center gap-3 pr-8">
              <span
                className={`px-3 py-1 rounded-full font-mono text-[10px] font-bold uppercase ${
                  selectedEvent.is_live
                    ? 'bg-accent text-white'
                    : 'bg-background border border-borderColor text-secondary'
                }`}
              >
                {selectedEvent.is_live ? 'Live Event' : 'Past Event'}
              </span>
              <span className="font-mono text-xs text-secondary">
                {formatEventDate(selectedEvent.date)}
              </span>
            </div>

            <h2 className="font-display text-2xl font-bold leading-snug">{selectedEvent.title}</h2>

            <div className="flex items-center gap-2 text-xs font-mono text-secondary border-y border-borderColor py-3">
              <MapPin className="w-4 h-4 text-accent shrink-0" />
              <span>Venue: {selectedEvent.venue || 'To Be Announced'}</span>
            </div>

            <div className="max-h-48 overflow-y-auto text-sm text-secondary leading-relaxed whitespace-pre-line">
              {selectedEvent.description?.trim() ||
                'No detailed description provided for this community event.'}
            </div>

            {selectedEvent.is_live && <EventCountdown date={selectedEvent.date} />}

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setSelectedEvent(null)}
                className="flex-1 h-11 rounded-xl border border-borderColor text-sm font-bold hover:bg-background transition-colors cursor-pointer"
              >
                Close
              </button>

              {selectedEvent.is_live && selectedEvent.registration_link && (
                <a
                  href={selectedEvent.registration_link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-[2] h-11 rounded-xl bg-accent text-white text-sm font-bold flex items-center justify-center gap-2 hover:opacity-90"
                >
                  Register Now <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. FOOTER */}
      <footer className="border-t border-borderColor bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-borderColor/60">
            <div className="space-y-4">
              <VyrekaLogo className="h-10" />
              <p className="text-xs text-secondary leading-relaxed font-sans pt-1">
                Bridging the gap between education and industry through production-first software
                builds, hackathons, and expert developer networks.
              </p>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <p className="font-bold text-primary uppercase tracking-wider">Navigation</p>
              <ul className="space-y-2 text-secondary">
                <li>
                  <button
                    onClick={() => setView('home')}
                    className="hover:text-primary transition-colors cursor-pointer"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setView('events')}
                    className="hover:text-primary transition-colors cursor-pointer"
                  >
                    Events
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setView('gallery')}
                    className="hover:text-primary transition-colors cursor-pointer"
                  >
                    Gallery
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <p className="font-bold text-primary uppercase tracking-wider">Community</p>
              <ul className="space-y-2 text-secondary">
                <li>
                  <button
                    onClick={() => setView('aboutus')}
                    className="hover:text-primary transition-colors cursor-pointer"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setView('core-team')}
                    className="hover:text-primary transition-colors cursor-pointer"
                  >
                    Core Team
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setView('contactus')}
                    className="hover:text-primary transition-colors cursor-pointer"
                  >
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <p className="font-bold text-primary uppercase tracking-wider">Connect With Us</p>
              <div className="flex items-center gap-3 pt-1">
                <a
                  href="https://www.linkedin.com/company/vyreka/"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-card border border-borderColor hover:border-accent/40 transition-colors shadow-xs"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-card border border-borderColor hover:border-accent/40 transition-colors shadow-xs"
                  aria-label="WhatsApp Community"
                  title="WhatsApp Community"
                >
                  <WhatsappIcon className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/_vyreka_?utm_source=qr&igsh=cGwxNGx3djg4dW1w"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-card border border-borderColor hover:border-accent/40 transition-colors shadow-xs"
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <InstagramIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-secondary">
            <p>© 2026 Vyreka Community. All rights reserved.</p>
            <p>Designed for engineers &amp; builders.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
