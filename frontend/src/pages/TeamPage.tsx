import { useState, useEffect } from "react";

type SocialLink = {
  type: "linkedin" | "x";
  url: string;
};

type TeamMember = {
  name: string;
  role: string;
  tag: string;
  bio: string;
  image: string; // Will handle the live URL string
  alt: string;
  socials: SocialLink[];
};

// Interface for parsing Django API structure raw response fields
interface BackendTeamMember {
  id: number;
  name: string;
  role: string;
  tag: string;
  bio: string;
  image_url: string;
  linkedin_url?: string;
  x_url?: string;
}

function LinkedInIcon() {
  return (
    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="mt-0.5 h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="group flex flex-col justify-between space-y-4 rounded-2xl border border-purple-100 bg-purple-50/60 p-4 shadow-sm transition-all duration-300 hover:border-primary-container/30 hover:shadow-md dark:border-primary/10 dark:bg-surface-container/50 dark:hover:border-primary/30">
      <div className="space-y-4">
        <div className="relative w-full overflow-hidden rounded-xl bg-purple-100/50 shadow-inner aspect-[4/5] dark:bg-surface-container-high">
          <img
            className="h-full w-full object-cover grayscale-[20%] transition-all duration-500 group-hover:grayscale-0"
            src={member.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&h=500&q=80"}
            alt={member.alt}
            onError={(e) => {
              // Graceful placeholder fallback if an image link breaks or fails to load
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&h=500&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-container/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        <div className="space-y-1.5 px-1">
          <h4 className="text-lg font-bold text-gray-900 transition-colors group-hover:text-primary-container dark:text-white dark:group-hover:text-primary">
            {member.name}
          </h4>

          <p className="text-sm font-bold uppercase tracking-wide text-primary-container dark:text-primary">
            {member.role}
          </p>

          {member.tag && (
            <div className="inline-block rounded-md border border-purple-200/60 bg-white px-2 py-0.5 text-[11px] font-semibold text-purple-700 shadow-sm dark:border-white/5 dark:bg-white/5 dark:text-secondary">
              {member.tag}
            </div>
          )}

          <p className="pt-2 text-sm leading-relaxed text-gray-600 dark:text-on-surface-variant">
            {member.bio}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3 border-t border-purple-100/50 px-1 pt-4 dark:border-white/5">
        {member.socials.map((social) => (
          <a
            key={social.url}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={
              social.type === "linkedin"
                ? "text-gray-400 transition-colors hover:text-blue-600 dark:hover:text-secondary"
                : "text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-white"
            }
            title={social.type === "linkedin" ? "LinkedIn Profile" : "X Profile"}
          >
            {social.type === "linkedin" ? <LinkedInIcon /> : <XIcon />}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Falls back to localhost URL if Vite's production environment variable isn't configured yet
    const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
    
    fetch(`${API_BASE}/api/team/`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to pull team structure data updates.");
        return res.json();
      })
      .then((data: BackendTeamMember[]) => {
        // Maps the flat backend relational database rows cleanly into the nested layout the UI expects
        const mappedMembers: TeamMember[] = data.map((item) => {
          const socials: SocialLink[] = [];
          if (item.linkedin_url) socials.push({ type: "linkedin", url: item.linkedin_url });
          if (item.x_url) socials.push({ type: "x", url: item.x_url });

          return {
            name: item.name,
            role: item.role,
            tag: item.tag || "",
            bio: item.bio || "",
            image: item.image_url,
            alt: item.name,
            socials: socials,
          };
        });
        setTeamMembers(mappedMembers);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <main className="bg-white pt-32 pb-stack-xl font-body-md text-gray-900 transition-colors duration-300 dark:bg-background dark:text-on-background">
      <section className="mx-auto mb-16 max-w-container-max px-margin-mobile text-center md:px-margin-desktop">
        <span className="mb-4 inline-block rounded-full border border-purple-200 bg-purple-100 px-3 py-1 text-xs font-medium text-primary-container dark:border-purple-500/20 dark:bg-purple-900/30 dark:text-purple-300">
          We're growing!
        </span>

        <h1 className="mx-auto mb-4 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-5xl">
          Meet the Team Behind Vyreka
        </h1>

        <p className="mx-auto max-w-2xl text-base text-gray-600 dark:text-on-surface-variant md:text-lg">
        Get to know the passionate individuals who are shaping Vyreka. 
        </p>
      </section>

      <section className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-700"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-500 font-semibold">
            Error loading team members: {error}
          </div>
        ) : teamMembers.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No team members added yet. Add them in the Django Admin panel!
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}