import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <main className="pt-20 dark:bg-background">
      <div className="mx-auto max-w-3xl space-y-12 px-margin-mobile py-16 md:px-margin-desktop">
        <section className="space-y-4">
          <h1 className="tracking-tight text-3xl font-extrabold text-indigo-950 dark:text-white md:text-4xl">
            About Vyreka
          </h1>

          <p className="text-md leading-relaxed text-gray-600 dark:text-on-surface-variant md:text-lg">
            At Vyreka, we believe that learning should go beyond classrooms and
            textbooks. Our mission is to bridge the gap between academic
            education and real-world industry expectations by creating
            opportunities for students and professionals to learn, connect, and
            grow.
          </p>

          <p className="text-md leading-relaxed text-gray-600 dark:text-on-surface-variant md:text-lg">
            Vyreka is more than just a community—it's a career accelerator built
            for those who want to turn knowledge into action. We provide a
            platform where individuals can gain practical experience, develop
            industry-relevant skills, and build meaningful professional
            relationships that support long-term career growth.
          </p>

          <p className="text-md leading-relaxed text-gray-600 dark:text-on-surface-variant md:text-lg">
            Through hands-on workshops, interactive lab sessions, industry
            visits, mentorship programs, and networking events, we help our
            members gain direct exposure to the professional world. Our focus is
            on empowering individuals with both technical expertise and
            essential soft skills such as communication, leadership,
            collaboration, and problem-solving.
          </p>

          <p className="text-md leading-relaxed text-gray-600 dark:text-on-surface-variant md:text-lg">
            Whether you're a student preparing for your first opportunity or a
            professional looking to stay ahead in a rapidly evolving industry,
            Vyreka offers the guidance, resources, and community needed to
            accelerate your journey.
          </p>
        </section>

        <section className="space-y-3 border-t border-gray-200 pt-4 dark:border-outline-variant/20">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Our Vision
          </h2>

          <p className="text-md leading-relaxed text-gray-600 dark:text-on-surface-variant md:text-lg">
            To create a future where every learner has access to practical
            industry experience, mentorship, and opportunities that enable them
            to thrive in their careers.
          </p>
        </section>

        <section className="space-y-6 border-t border-gray-200 pt-4 dark:border-outline-variant/20">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            What We Offer
          </h2>

          <div className="space-y-4">
            <p className="text-md leading-relaxed text-gray-600 dark:text-on-surface-variant md:text-lg">
              <strong className="mb-0.5 block font-semibold text-gray-900 dark:text-white">
                Practical Learning
              </strong>
              Hands-on workshops and practical learning experiences.
            </p>

            <p className="text-md leading-relaxed text-gray-600 dark:text-on-surface-variant md:text-lg">
              <strong className="mb-0.5 block font-semibold text-gray-900 dark:text-white">
                Expert Guidance
              </strong>
              Industry mentorship and expert guidance.
            </p>

            <p className="text-md leading-relaxed text-gray-600 dark:text-on-surface-variant md:text-lg">
              <strong className="mb-0.5 block font-semibold text-gray-900 dark:text-white">
                Corporate Exposure
              </strong>
              Corporate visits and real-world industry exposure.
            </p>

            <p className="text-md leading-relaxed text-gray-600 dark:text-on-surface-variant md:text-lg">
              <strong className="mb-0.5 block font-semibold text-gray-900 dark:text-white">
                Strategic Connections
              </strong>
              Professional networking opportunities.
            </p>

            <p className="text-md leading-relaxed text-gray-600 dark:text-on-surface-variant md:text-lg">
              <strong className="mb-0.5 block font-semibold text-gray-900 dark:text-white">
                Career Readiness
              </strong>
              Career readiness and skill development programs.
            </p>

            <p className="text-md leading-relaxed text-gray-600 dark:text-on-surface-variant md:text-lg">
              <strong className="mb-0.5 block font-semibold text-gray-900 dark:text-white">
                Focused Ecosystem
              </strong>
              A supportive community focused on growth and innovation.
            </p>
          </div>
        </section>

        <section className="space-y-6 border-t border-gray-200 pt-8 text-center dark:border-outline-variant/20">
          <p className="text-md font-medium leading-relaxed text-indigo-900 dark:text-primary md:text-lg">
            At Vyreka, we're building a bridge between learning and
            doing—helping individuals transform potential into professional
            success.
          </p>

          <div className="pt-2">
            <Link
              to="/team"
              className="inline-flex items-center gap-2 rounded-xl bg-purple-200 px-8 py-3.5 font-bold text-purple-900 shadow-sm transition-colors hover:bg-purple-300 dark:bg-primary dark:text-on-primary"
            >
              Meet the Team
              <span className="material-symbols-outlined text-md">
                arrow_forward
              </span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
