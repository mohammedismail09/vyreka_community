import { useState } from "react";

type FeedbackState = {
  type: "success" | "error";
  text: string;
} | null;

type ContactFormData = {
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  message: string;
};

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:8000";

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackState>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

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
        throw new Error(data.error || "Request failed");
      }

      setFeedback({
        type: "success",
        text: data.message || "Your message has been sent successfully!",
      });

      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        mobile: "",
        message: "",
      });
    } catch (error) {
      setFeedback({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-gray-50 pt-20 transition-colors duration-300 dark:bg-background">
      <section className="py-stack-xl">
        <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
          <div className="mb-stack-xl text-center">
            <h2 className="text-headline-lg tracking-tight text-purple-900 dark:text-on-surface">
              Get in Touch
            </h2>
            <p className="mt-2 text-body-md text-gray-600 dark:text-on-surface-variant">
              Have questions about upcoming tracks or partnerships? Drop us a
              line.
            </p>
          </div>

          <div className="grid items-start gap-stack-xl md:grid-cols-2">
            <div className="space-y-6 text-gray-900 dark:text-on-surface">
              <h3 className="mb-4 text-headline-md font-bold">
                Let&apos;s Connect
              </h3>

              <p className="mb-stack-lg text-body-md leading-relaxed text-gray-600 dark:text-on-surface-variant">
                We are active and monitoring inbox feeds daily. Send your
                questions over and our core engineering mentors or operations
                team will loop back within 24 hours.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-200 text-purple-900 dark:bg-primary/10 dark:text-primary">
                    <span className="material-symbols-outlined">mail</span>
                  </div>
                  <div>
                    <h6 className="font-bold">Email Support</h6>
                    <p className="text-body-md text-gray-600 dark:text-on-surface-variant">
                      vyrekaedtech@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-200 text-purple-900 dark:bg-secondary/10 dark:text-secondary">
                    <span className="material-symbols-outlined">share</span>
                  </div>
                  <div>
                    <h6 className="font-bold">Social Presence</h6>
                    <div className="mt-1 flex gap-4">
                      <a
                        href="https://www.linkedin.com/company/vyreka/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 transition-colors hover:text-indigo-600 dark:text-on-surface-variant dark:hover:text-primary"
                      >
                        LinkedIn
                      </a>
                      |
                      <a
                        href="https://www.instagram.com/_vyreka_/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 transition-colors hover:text-indigo-600 dark:text-on-surface-variant dark:hover:text-primary"
                      >
                        Instagram
                      </a>
                      |
                      <a
                        href="https://chat.whatsapp.com/Lp8HCvoz8NyLS1ynXKLDDz?s=sh&p=a&ilr=2"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 transition-colors hover:text-indigo-600 dark:text-on-surface-variant dark:hover:text-primary"
                      >
                        Whatsapp
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-outline-variant/20 dark:bg-surface-container/40">
              {feedback && (
                <div
                  className={`mb-4 rounded-xl p-4 text-sm font-medium ${
                    feedback.type === "success"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                  }`}
                >
                  {feedback.text}
                </div>
              )}

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-label-sm font-medium text-gray-600 dark:text-on-surface-variant">
                      First Name *
                    </label>
                    <input
                      name="first_name"
                      type="text"
                      required
                      value={formData.first_name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          first_name: e.target.value,
                        }))
                      }
                      className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-gray-900 outline-none transition-all focus:ring-2 focus:ring-purple-900 focus:ring-offset-2 dark:border-none dark:bg-surface-container-high dark:text-white dark:focus:ring-primary dark:focus:ring-offset-surface"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-label-sm font-medium text-gray-600 dark:text-on-surface-variant">
                      Last Name *
                    </label>
                    <input
                      name="last_name"
                      type="text"
                      required
                      value={formData.last_name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          last_name: e.target.value,
                        }))
                      }
                      className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-gray-900 outline-none transition-all focus:ring-2 focus:ring-purple-900 focus:ring-offset-2 dark:border-none dark:bg-surface-container-high dark:text-white dark:focus:ring-primary dark:focus:ring-offset-surface"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-label-sm font-medium text-gray-600 dark:text-on-surface-variant">
                    Email Address *
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-gray-900 outline-none transition-all focus:ring-2 focus:ring-purple-900 focus:ring-offset-2 dark:border-none dark:bg-surface-container-high dark:text-white dark:focus:ring-primary dark:focus:ring-offset-surface"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-label-sm font-medium text-gray-600 dark:text-on-surface-variant">
                    Mobile Number{" "}
                    <span className="text-xs font-normal text-gray-400">
                      (Optional)
                    </span>
                  </label>
                  <input
                    name="mobile"
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        mobile: e.target.value,
                      }))
                    }
                    className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-gray-900 outline-none transition-all focus:ring-2 focus:ring-purple-900 focus:ring-offset-2 dark:border-none dark:bg-surface-container-high dark:text-white dark:focus:ring-primary dark:focus:ring-offset-surface"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-label-sm font-medium text-gray-600 dark:text-on-surface-variant">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        message: e.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 p-4 text-gray-900 outline-none transition-all focus:ring-2 focus:ring-purple-900 focus:ring-offset-2 dark:border-none dark:bg-surface-container-high dark:text-white dark:focus:ring-primary dark:focus:ring-offset-surface"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-200 py-4 font-bold text-purple-900 transition-colors hover:bg-purple-300 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-primary dark:text-on-primary"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <span className="material-symbols-outlined text-sm">
                    send
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
