import founderImg from "../assets/images/founder.jpg";
import pradeepImg from "../assets/images/pradeep.jpeg";
import saikiranImg from "../assets/images/saikiran.jpeg";
import ismailImg from "../assets/images/ismail.jpeg";
import ankamImg from "../assets/images/ankam.jpeg";
import rahulImg from "../assets/images/rahul.jpeg";
import krishnaveniImg from "../assets/images/krishnaveni.jpeg";
import afeefaImg from "../assets/images/afeefa.jpeg";
import rimshaImg from "../assets/images/rimsha.jpeg";
import geethikaImg from "../assets/images/geethika.jpeg";
import sreejaImg from "../assets/images/sreeja.jpg";
import moraShivaImg from "../assets/images/mora_shiva.jpeg";
import revanthImg from "../assets/images/revanth.jpeg";

type SocialLink = {
  type: "linkedin" | "x";
  url: string;
};

type TeamMember = {
  name: string;
  role: string;
  tag: string;
  bio: string;
  image: string;
  alt: string;
  socials: SocialLink[];
};

const teamMembers: TeamMember[] = [
  {
    name: "Vaishnavi Devi",
    role: "Founder",
    tag: "AI/ML Engineer | Community Builder",
    bio: "I am Vaishnavi, AI/ML Engineer and Data Analyst with a strong interest in Generative AI. Founder of Vyreka, a Hyderabad-based tech community empowering students with industry-ready skills through practical learning and collaboration.",
    image: founderImg,
    alt: "Vaishnavi Devi",
    socials: [
      {
        type: "linkedin",
        url: "https://www.linkedin.com/in/vanam-vaishnavi-devi-9601ba2bb/",
      },
    ],
  },
  {
    name: "Pothala PradeepKiran",
    role: "Community Lead",
    tag: "Associate Software Engineer",
    bio: "Passionate technology professional dedicated to continuous learning, problem-solving, and creating impactful solutions through architectural design, technology transformation, and team-wide collaboration.",
    image: pradeepImg,
    alt: "Pothala Pradeep Kiran",
    socials: [
      {
        type: "linkedin",
        url: "https://www.linkedin.com/in/pradeep-kiran-275010278?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      },
    ],
  },
  {
    name: "Guggilla SaiKiran",
    role: "Community Lead",
    tag: "Graphics & Social Intern @ GoAvo.ai",
    bio: "Graphics & Social Media Intern @Goavo.ai and Team Lead at Vyreka, combining creativity, leadership, and digital marketing to create impactful brand experiences.",
    image: saikiranImg,
    alt: "Guggilla SaiKiran",
    socials: [
      { type: "linkedin", url: "https://www.linkedin.com/in/guggillasaikiran" },
    ],
  },
  {
    name: "Mohammed Ismail",
    role: "Technical Lead",
    tag: "Backend Developer",
    bio: "Backend Developer focused on building robust architectures, optimizing performance, and developing solutions that bridge innovation with execution.",
    image: ismailImg,
    alt: "Mohammed Ismail",
    socials: [
      {
        type: "linkedin",
        url: "https://www.linkedin.com/in/mohammedismail02/",
      },
      { type: "x", url: "https://x.com/mohdismailx27" },
    ],
  },
  {
    name: "Ankam Vennela",
    role: "Technical Support",
    tag: "Systems Engineering | IT Operations",
    bio: "Dedicated to troubleshooting technical challenges, managing infrastructure setups, and assisting standard developer operations across ecosystem platforms.",
    image: ankamImg,
    alt: "Ankam Vennela",
    socials: [
      {
        type: "linkedin",
        url: "https://www.linkedin.com/in/vennela-ankam-544740318",
      },
    ],
  },
  {
    name: "Rahul Paladugula",
    role: "Technical Support",
    tag: "DevOps Lifecycle | IT Infrastructure",
    bio: "Focused on technical workspace integrity, deployment workflows, and ensuring students experience smooth configurations during hackathons and dynamic practical workshops.",
    image: rahulImg,
    alt: "Rahul Paladugula",
    socials: [
      {
        type: "linkedin",
        url: "https://www.linkedin.com/in/rahul5892?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      },
    ],
  },
  {
    name: "Krishnaveni Reddy",
    role: "Speaker Outreach",
    tag: "Corporate Relations | Communications",
    bio: "Connecting Vyreka with corporate visionaries and tech industry veterans to organize masterclasses that enrich our student learning ecosystems.",
    image: krishnaveniImg,
    alt: "Krishnaveni Reddy",
    socials: [
      {
        type: "linkedin",
        url: "https://www.linkedin.com/in/krishnaveni-reddy-233653278?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      },
    ],
  },
  {
    name: "Afeefa Rahman",
    role: "Speaker Research & Outreach",
    tag: "Market Research | Content Alignment",
    bio: "Curating a diverse roster of technical speakers by scouting emerging talent and validating industry relevance to align our tech seminars with future market trends.",
    image: afeefaImg,
    alt: "Afeefa Rahman",
    socials: [
      {
        type: "linkedin",
        url: "https://www.linkedin.com/in/afeefa-rahman-b844a3321",
      },
    ],
  },
  {
    name: "Rimsha Nishanth",
    role: "PR and Sponsorship",
    tag: "Financial Strategy | Public Relations",
    bio: "Driving strategic institutional alliances and securing community resource sponsorships to elevate funding scale and keep event access fully dynamic for tech scale builders.",
    image: rimshaImg,
    alt: "Rimsha Nishanth",
    socials: [
      {
        type: "linkedin",
        url: "https://www.linkedin.com/in/rimsha-nishath-b1a618337",
      },
    ],
  },
  {
    name: "Geethika",
    role: "PR and Marketing",
    tag: "Growth Marketing | Campaign Operations",
    bio: "Leading promotional outreach blueprints and public relations funnels across social channels to scale tech awareness and optimize organic community growth parameters.",
    image: geethikaImg,
    alt: "Geethika",
    socials: [
      {
        type: "linkedin",
        url: "https://www.linkedin.com/in/geethika-jaggumantri-9867773b4",
      },
    ],
  },
  {
    name: "Sreeja Shetty",
    role: "PR & Operations / Event Management",
    tag: "Event Execution | Anchoring",
    bio: "Managing on-ground event workflows, stage presence dynamics, and anchoring live meetups to maintain engaging, seamless community event timelines.",
    image: sreejaImg,
    alt: "Sreeja Shetty",
    socials: [
      {
        type: "linkedin",
        url: "https://www.linkedin.com/in/sreeja-shetty-1b3711301",
      },
    ],
  },
  {
    name: "Mora Shiva",
    role: "Public Relations",
    tag: "Media Communications | Networking",
    bio: "Managing local public networks, student ecosystem relations, and community visibility channels to foster dynamic collaboration structures across Hyderabad's colleges.",
    image: moraShivaImg,
    alt: "Mora Shiva",
    socials: [
      {
        type: "linkedin",
        url: "https://www.linkedin.com/in/mora-shiva-6004b2357?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      },
    ],
  },
  {
    name: "Revanth Pathapati",
    role: "Public Relations & Photographer",
    tag: "Media Communications | Networking",
    bio: "Managing local public networks, student ecosystem relations, and community visibility channels to foster dynamic collaboration structures across Hyderabad's colleges.",
    image: revanthImg,
    alt: "Revanth",
    socials: [
      {
        type: "linkedin",
        url: "https://www.linkedin.com/in/revanth-pathapati-434211372?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      },
    ],
  },
];

function LinkedInIcon() {
  return (
    <svg
      className="h-5 w-5 fill-current"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      className="mt-0.5 h-5 w-5 fill-current"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
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
            src={member.image}
            alt={member.alt}
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

          <div className="inline-block rounded-md border border-purple-200/60 bg-white px-2 py-0.5 text-[11px] font-semibold text-purple-700 shadow-sm dark:border-white/5 dark:bg-white/5 dark:text-secondary">
            {member.tag}
          </div>

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
            title={
              social.type === "linkedin" ? "LinkedIn Profile" : "X Profile"
            }
          >
            {social.type === "linkedin" ? <LinkedInIcon /> : <XIcon />}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function TeamPage() {
  return (
    <main className="bg-white pt-32 pb-stack-xl font-body-md text-gray-900 transition-colors duration-300 dark:bg-background dark:text-on-background">
      <section className="mx-auto mb-16 max-w-container-max px-margin-mobile text-center md:px-margin-desktop">
        <span className="mb-4 inline-block rounded-full border border-purple-200 bg-purple-100 px-3 py-1 text-xs font-medium text-primary-container dark:border-purple-500/20 dark:bg-purple-900/30 dark:text-purple-300">
          We're growing!
        </span>

        <h1 className="mx-auto mb-4 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-5xl">
          We are the people who make up Vyreka
        </h1>

        <p className="mx-auto max-w-2xl text-base text-gray-600 dark:text-on-surface-variant md:text-lg">
          Our philosophy is simple; hire great people and give them the
          resources and support to do their best work.
        </p>
      </section>

      <section className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </section>
    </main>
  );
}
