import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Loader2,
  Mail,
  MapPin,
  RefreshCw,
  Send,
} from "lucide-react";
import { useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { Link } from "react-router";
import { Eyebrow, Reveal, Section } from "@/components/site/Section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { phones } from "@/data/phones";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const TOPICS = [
  "Request a device",
  "Correct a specification",
  "Report a photo issue",
  "Something else",
];

const DETAILS = [
  { icon: Mail, label: "Email", value: "catalog@phoneshowcase.app" },
  { icon: Clock, label: "Response time", value: "Usually within a day" },
  { icon: MapPin, label: "Maintained from", value: "Bengaluru, India" },
  { icon: RefreshCw, label: "Updated", value: "As new flagships are released" },
];

const COVERAGE = [
  {
    title: "Apple line",
    count: phones.filter((phone) => phone.brand === "Apple").length,
    body: "Every iPhone in the catalog, from the iPhone 14 Pro through the iPhone 15 Pro Max.",
  },
  {
    title: "Samsung line",
    count: phones.filter((phone) => phone.brand === "Samsung").length,
    body: "Galaxy S, the foldables and the last of the Note line, all with verified figures.",
  },
  {
    title: "Foldables",
    count: phones.filter((phone) => phone.tags.includes("Foldable")).length,
    body: "The Galaxy Z Fold 4 and the original Z Flip, kept side by side for comparison.",
  },
];

const MAINTAINED = [
  "Your note reaches the person who keeps this catalog, not a support queue.",
  "The figure is checked against the manufacturer's published specification.",
  "The entry is corrected, and the change shows up in the catalog immediately.",
];

const FAQS = [
  {
    q: "Where do the specifications come from?",
    a: "Every figure is taken from the manufacturer's published specification sheet and re-checked before the entry goes into the catalog. Launch prices are the prices announced at release, not current retail prices.",
  },
  {
    q: "How current is the catalog?",
    a: "It covers releases from 2020 through 2024 and currently holds eleven devices. New flagships are added once verified figures and a usable photograph are both available.",
  },
  {
    q: "Can I ask for a device that is missing?",
    a: "Yes, and that is the most common reason to use this page. Send the model name and it gets added as soon as the specification sheet and photograph are ready.",
  },
  {
    q: "Are the photographs licensed?",
    a: "Yes. Each entry uses freely licensed product photography from Wikimedia Commons, credited in the footer. No marketing renders are used.",
  },
  {
    q: "What does starring a device actually do?",
    a: "It saves that entry to your own dashboard against your sign-in, where it stays until you remove it. Nothing is shared or published anywhere.",
  },
];

type Status = "idle" | "submitting" | "sent";

interface FormState {
  name: string;
  email: string;
  topic: string;
  message: string;
}

const INITIAL: FormState = {
  name: "",
  email: "",
  topic: TOPICS[0],
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<Status>("idle");

  const update =
    (key: keyof FormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: event.target.value }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  const validate = (values: FormState) => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (values.name.trim().length < 2) next.name = "Add a name to reply to.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
      next.email = "Enter an email address that can receive a reply.";
    if (values.message.trim().length < 12)
      next.message = "One sentence about the device is enough.";
    return next;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    // Frontend-only build: no backend call, just an optimistic confirmation.
    setStatus("submitting");
    window.setTimeout(() => setStatus("sent"), 850);
  };

  const reset = () => {
    setForm(INITIAL);
    setErrors({});
    setStatus("idle");
  };

  return (
    <>
      {/* ------------------------------------------------------ Page header */}
      <Section className="pt-14 pb-10 md:pt-20">
        <Reveal className="max-w-2xl">
          <Eyebrow>Contact</Eyebrow>
          <h1 className="mt-6 text-4xl leading-tight font-semibold tracking-tight text-balance sm:text-5xl">
            Keep the <span className="text-gradient">catalog accurate</span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            This catalog is maintained by one person. Send a note about a device
            that is missing, a figure that looks wrong, or a photograph that
            will not load.
          </p>
        </Reveal>
      </Section>

      {/* ----------------------------------------------------- Form + detail */}
      <Section className="pt-0">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-edge bg-card/60 p-6 sm:p-8">
              <div
                aria-hidden
                className="absolute -top-28 -right-20 size-64 rounded-full bg-[var(--brand)]/20 blur-3xl"
              />

              <AnimatePresence mode="wait">
                {status === "sent" ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="relative flex min-h-[24rem] flex-col items-center justify-center text-center"
                  >
                    <motion.span
                      initial={{ scale: 0.4, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1, type: "spring", stiffness: 220, damping: 16 }}
                      className="grid size-16 place-items-center rounded-full border border-brand/40 bg-brand/15 text-brand"
                    >
                      <CheckCircle2 className="size-8" />
                    </motion.span>
                    <h2 className="mt-6 text-2xl font-semibold tracking-tight">
                      Note received, {form.name.split(" ")[0] || "friend"}
                    </h2>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                      A reply will go to {form.email}. Anything about a
                      specification gets checked against the manufacturer&apos;s
                      sheet before the entry changes.
                    </p>
                    <div className="mt-7 flex flex-wrap justify-center gap-3">
                      <Button className="rounded-full" onClick={reset}>
                        Send another note
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="rounded-full border-edge bg-white/[0.03]"
                      >
                        <Link to="/gallery">
                          Back to the catalog
                          <ArrowRight className="size-4" />
                        </Link>
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    onSubmit={handleSubmit}
                    noValidate
                    className="relative space-y-5"
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field id="name" label="Your name" error={errors.name}>
                        <Input
                          id="name"
                          name="name"
                          value={form.name}
                          onChange={update("name")}
                          placeholder="Aarav Mehta"
                          autoComplete="name"
                          aria-invalid={Boolean(errors.name)}
                          className="border-edge bg-white/[0.03]"
                        />
                      </Field>

                      <Field id="email" label="Email" error={errors.email}>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={update("email")}
                          placeholder="you@example.com"
                          autoComplete="email"
                          aria-invalid={Boolean(errors.email)}
                          className="border-edge bg-white/[0.03]"
                        />
                      </Field>
                    </div>

                    <Field id="topic" label="What is this about?">
                      <Select
                        value={form.topic}
                        onValueChange={(value) =>
                          setForm((prev) => ({ ...prev, topic: value }))
                        }
                      >
                        <SelectTrigger
                          id="topic"
                          className="w-full border-edge bg-white/[0.03]"
                        >
                          <SelectValue placeholder="Choose a topic" />
                        </SelectTrigger>
                        <SelectContent>
                          {TOPICS.map((topic) => (
                            <SelectItem key={topic} value={topic}>
                              {topic}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>

                    <Field
                      id="message"
                      label="Which device, and what should change?"
                      error={errors.message}
                    >
                      <Textarea
                        id="message"
                        name="message"
                        value={form.message}
                        onChange={update("message")}
                        rows={5}
                        placeholder="The Galaxy Z Flip 6 is missing from the catalog, and the battery figure on the S23 looks wrong."
                        aria-invalid={Boolean(errors.message)}
                        className="resize-none border-edge bg-white/[0.03]"
                      />
                    </Field>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        This form confirms locally for now — it does not send
                        anything yet.
                      </p>
                      <Button
                        type="submit"
                        size="lg"
                        disabled={status === "submitting"}
                        className="group rounded-full px-6"
                      >
                        {status === "submitting" ? (
                          <>
                            <Loader2 className="size-4 animate-spin" />
                            Sending
                          </>
                        ) : (
                          <>
                            Send note
                            <Send className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                          </>
                        )}
                      </Button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="h-full">
            <div className="flex h-full flex-col gap-4">
              <div className="rounded-3xl border border-edge bg-card/50 p-6">
                <h2 className="text-base font-semibold tracking-tight">
                  Details
                </h2>
                <dl className="mt-5 space-y-4">
                  {DETAILS.map((detail) => (
                    <div key={detail.label} className="flex gap-3.5">
                      <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-edge bg-white/[0.04] text-brand">
                        <detail.icon className="size-4" />
                      </span>
                      <div>
                        <dt className="text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                          {detail.label}
                        </dt>
                        <dd className="mt-0.5 text-sm text-foreground">
                          {detail.value}
                        </dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="rounded-3xl border border-edge bg-gradient-to-br from-white/[0.06] to-transparent p-6">
                <h2 className="text-base font-semibold tracking-tight">
                  How a correction is handled
                </h2>
                <ol className="mt-5 space-y-4">
                  {MAINTAINED.map((step, index) => (
                    <li key={step} className="flex gap-3.5 text-sm text-muted-foreground">
                      <span className="grid size-6 shrink-0 place-items-center rounded-full border border-edge bg-white/[0.04] text-[11px] font-medium text-foreground">
                        {index + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* --------------------------------------------------------- Coverage */}
      <Section className="border-y border-edge bg-[var(--stage)]/40">
        <Reveal className="max-w-2xl">
          <Eyebrow>Coverage</Eyebrow>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
            What the catalog covers
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {COVERAGE.map((group, index) => (
            <Reveal key={group.title} delay={index * 0.08}>
              <div className="group h-full rounded-3xl border border-edge bg-card/50 p-6 transition-colors duration-300 hover:border-white/25">
                <p className="text-[11px] tracking-[0.2em] text-brand uppercase">
                  {group.count} {group.count === 1 ? "entry" : "entries"}
                </p>
                <p className="mt-3 text-base font-medium text-foreground">
                  {group.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {group.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* -------------------------------------------------------------- FAQ */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <Eyebrow>Questions</Eyebrow>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              How the catalog works
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Anything not answered here can go through the form above.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((faq, index) => (
                <AccordionItem
                  key={faq.q}
                  value={`faq-${index}`}
                  className="border-b border-edge"
                >
                  <AccordionTrigger className="py-5 text-left text-[15px] font-medium hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </Section>
    </>
  );
}

/** Label + input + inline error, kept in one place so every field matches. */
function Field({
  id,
  label,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label
        htmlFor={id}
        className="text-xs tracking-[0.08em] text-muted-foreground uppercase"
      >
        {label}
      </Label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="text-xs text-destructive"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
