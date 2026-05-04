import Link from "next/link";
import {
  ShieldAlert,
  Search,
  CreditCard,
  Bell,
  Menu,
  X,
  Mail,
  Phone,
  Gauge,
  MapPin,
  ClipboardList,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// ─── Config — edit these in one place ────────────────────────────────────────

const APP_CONFIG = {
  name: "SpeedWatch",
  tagline: "Rwanda's Traffic Fine Management System",
  description:
    "Check your outstanding traffic violations, pay fines securely online, and keep your vehicle record clean — all in one place.",
  contact: {
    email: "support@speedwatch.rw",
    phone: "+250 788 000 000",
  },
  nav: [
    { label: "Check Fines",  href: "/fines"    },
    { label: "Pay a Fine",   href: "/payments" },
  ],
 
 
} as const;

const FOUNDING_YEAR = 2026;

// ─── Navbar ──────────────────────────────────────────────────────────────────

function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-foreground">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-destructive">
            <Gauge className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm tracking-tight">{APP_CONFIG.name}</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {APP_CONFIG.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden md:inline-flex h-8 text-xs">
            <Link href="/fines">Check My Fines</Link>
          </Button>
          <Button asChild size="sm" className="hidden md:inline-flex h-8 text-xs" variant={"outline"}>
            <Link href="/login">Sign in</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="border-b bg-muted/30 h-full">
      <div className="mx-auto max-w-5xl px-4 md:px-6 py-16 md:py-24">
        <div className="max-w-2xl">
         
          {/* Headline */}
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight mb-4">
            Check & Pay Your<br />
            <span className="text-destructive">Traffic Fines</span> Online
          </h1>

          {/* Sub */}
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
            {APP_CONFIG.description}
          </p>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-11 px-6 text-sm font-semibold">
              <Link href="/fines">
                <Search className="mr-2 h-4 w-4" />
                Check My Fines
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-11 px-6 text-sm font-semibold">
              <Link href="/payments">
                <CreditCard className="mr-2 h-4 w-4" />
                Pay a Fine
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
 

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const currentYear = new Date().getFullYear();
  const yearDisplay =
    currentYear > FOUNDING_YEAR
      ? `${FOUNDING_YEAR}–${currentYear}`
      : `${FOUNDING_YEAR}`;

  return (
    <footer className="bg-muted/20">
      <div className="mx-auto max-w-5xl px-4 md:px-6 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          {/* Copyright */}
          <span>
            © {yearDisplay}{" "}
            <span className="font-medium text-foreground">{APP_CONFIG.name}</span>
            . All rights reserved.
          </span>

          {/* Contact */}
          <div className="flex items-center gap-4">
            <a
              href={`mailto:${APP_CONFIG.contact.email}`}
              className="flex items-center gap-1.5 hover:text-foreground transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
              {APP_CONFIG.contact.email}
            </a>
            <Separator orientation="vertical" className="h-3.5" />
            <a
              href={`tel:${APP_CONFIG.contact.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-1.5 hover:text-foreground transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              {APP_CONFIG.contact.phone}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="">
        <Hero />
      </main>
      <Footer />
    </div>
  );
}