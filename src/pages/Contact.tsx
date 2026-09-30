import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Headphones,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { Link } from "react-router";
import { Reveal, Section, Eyebrow } from "@/components/site/Section";
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
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const TOPICS = [
  "Book a hands-on demo",
  "Trade-in valuation",
  "Compare iPhone vs Galaxy",
  "Repair or warranty",
  "Something else",
];

const DETAILS = [
  {
    icon: MapPin,
    label: "Studio",
    value: "18 Marlow Yard, Unit 4\nBengaluru 560001",
  },
  { icon: Phone, label: "Call us", value: "+91 80 4000 2020" },
  { icon: Mail, label: "Email", value: "hello@mobiusstudio.dev" },
  { icon: Clock, label: "Open", value: "Mon–Sat, 10:00 – 20:00" },
];

const LOCATIONS = [
  {
    city: "Bengaluru",
    address: "18 Marlow Yard, Unit 4",
    note: "Flagship studio · all 11 devices on the floor",
  },
  {
    city: "Mumbai",
    address: "Level 3, Dock Lane, Lower Parel",
    note: "Trade-in bar · 9 foldables and Pro models",
  },
  {
    city: "Hyderabad",
    address: "42 Banyan Court, Jubilee Hills",
    note: "Service desks · repairs and battery swaps",
  },
];

const FAQS = [
  {
    q: "Do I need an appointment to try the devices?",
    a: "Walk-ins are welcome, but a booked slot means the exact phones you want are charged, wiped and waiting with your SIM ready. Slots are 30 minutes and free.",
  },
  {
    q: "Can I trade in a phone bought somewhere else?",
    a: "Yes. We grade any working iPhone or Galaxy in about ten minutes, then credit the value directly against your new device. Bring a charger and the original box if you have it.",
  },
  {
    q: "How many models can I actually hold?",
    a: "All eleven in the catalogue are on the floor of the Bengaluru studio, including the foldables. Mumbai and Hyderabad keep a rotating subset — tell us what you want and we will move it to your nearest studio.",
  },
  {
    q: "Do you service phones bought elsewhere?",
    a: "We do. Battery replacements, screen repairs and data migration are available on out-of-warranty devices, usually same day.",
  },
  {
    q: "Is the 24-month cover included or extra?",
    a: "Included on every device bought from Mobius. It covers one accidental-damage repair, battery health checks and a loaner phone while yours is in service.",
  },
];

type Status = "idle" | "submitting" | "sent";

interface FormState {
  name: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
}

const INITIAL: FormState = {
  name: "",
  email: "",
  phone: "",
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
    if (values.name.trim().length < 2) next.name = "Tell us who we should ask for.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
      next.email = "Enter an email we can actually reply to.";
    if (values.phone.trim() && values.phone.trim().length < 7)
      next.phone = "That number looks too short.";
    if (values.message.trim().length < 12)
      next.message = "A sentence or two helps us prepare.";
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
          <Eyebrow>
            <Headphones className="size-3.5" />
            Talk to the studio
          </Eyebrow>
          <h1 className="mt-6 text-4xl leading-tight font-semibold tracking-tight text-balance sm:text-5xl">
            Book a slot and{" "}
            <span className="text-gradient">hold the hardware</span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Tell us which devices you want on the table and what you are
            upgrading from. We reply within one working day, usually much
            sooner.
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
                    className="relative flex min-h-[26rem] flex-col items-center justify-center text-center"
                  >
                    <motion.span
                      initial={{ scale: 0.4, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1, type: "spring", stiffness: 220, damping: 16 }}
                      className="grid size-16 place-items-center rounded-full border border-[var(--brand)]/40 bg-[var(--brand)]/15 text-brand"
                    >
                      <CheckCircle2 className="size-8" />
                    </motion.span>
                    <h2 className="mt-6 text-2xl font-semibold tracking-tight">
                      Request received, {form.name.split(" ")[0] || "friend"}
                    </h2>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                      We will email {form.email} with two or three slot options
                      and confirm which devices to have charged. Nothing has been
                      charged or reserved yet.
                    </p>
                    <div className="mt-7 flex flex-wrap justify-center gap-3">
                      <Button className="rounded-full" onClick={reset}>
                        Send another message
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="rounded-full border-edge bg-white/[0.03]"
                      >
                        <Link to="/gallery">
                          Back to the gallery
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
                      <Field
                        id="name"
                        label="Your name"
                        error={errors.name}
                        className="sm:col-span-1"
                      >
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

                      <Field
                        id="phone"
                        label="Phone"
                        hint="optional"
                        error={errors.phone}
                      >
                        <Input
                          id="phone"
                          name="phone"
                          value={form.phone}
                          onChange={update("phone")}
                          placeholder="+91 98••• •••••"
                          autoComplete="tel"
                          className="border-edge bg-white/[0.03]"
                        />
                      </Field>

                      <Field id="topic" label="What do you need?">
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
                    </div>

                    <Field
                      id="message"
                      label="Which devices, and what are you upgrading from?"
                      error={errors.message}
                    >
                      <Textarea
                        id="message"
                        name="message"
                        value={form.message}
                        onChange={update("message")}
                        rows={5}
                        placeholder="I want to compare the iPhone 15 Pro Max with the Galaxy S24 Ultra, and trade in an iPhone 12."
                        aria-invalid={Boolean(errors.message)}
                        className="resize-none border-edge bg-white/[0.03]"
                      />
                    </Field>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        This demo form does not send data anywhere yet — it
                        confirms your request locally.
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
                            Send request
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
                  Studio details
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
                        <dd className="mt-0.5 text-sm whitespace-pre-line text-foreground">
                          {detail.value}
                        </dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="rounded-3xl border border-edge bg-gradient-to-br from-white/[0.06] to-transparent p-6">
                <h2 className="text-base font-semibold tracking-tight">
                  What happens next
                </h2>
                <ol className="mt-5 space-y-4">
                  {[
                    "We read your note and pick two or three slot options.",
                    "You choose one, and we charge the devices you asked about.",
                    "You hold them side by side, no sales script attached.",
                  ].map((step, index) => (
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

      {/* -------------------------------------------------------- Locations */}
      <Section className="border-y border-edge bg-[var(--stage)]/40">
        <Reveal className="max-w-2xl">
          <Eyebrow>Find us</Eyebrow>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
            Three studios, one catalogue
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {LOCATIONS.map((location, index) => (
            <Reveal key={location.city} delay={index * 0.08}>
              <div className="group h-full rounded-3xl border border-edge bg-card/50 p-6 transition-colors duration-300 hover:border-white/25">
                <p className="text-[11px] tracking-[0.2em] text-brand uppercase">
                  {location.city}
                </p>
                <p className="mt-3 text-base font-medium text-foreground">
                  {location.address}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {location.note}
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
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Answers before you ask
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Still unsure about something? Send the form and we will answer in
              plain language, no spec-sheet copy pasting.
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
  hint,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-baseline justify-between gap-2">
        <Label htmlFor={id} className="text-xs tracking-[0.08em] text-muted-foreground uppercase">
          {label}
        </Label>
        {hint && <span className="text-[11px] text-muted-foreground/70">{hint}</span>}
      </div>
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
