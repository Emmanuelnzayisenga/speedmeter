"use client";

import { useState, useTransition, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import {
  Search,
  Car,
  ShieldAlert,
  Gauge,
  MapPin,
  Clock,
  CreditCard,
  Loader2,
  ChevronRight,
  AlertTriangle,
  X,
  Banknote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type ViolationStatus = "PENDING" | "CONFIRMED";

interface Violation {
  id: string;
  speed: number;
  speedLimit: number;
  excessSpeed: number;
  fineAmount: number;
  status: ViolationStatus;
  timestamp: string;
  latitude: number;
  longitude: number;
  vehicle: { name: string; plateNumber: string };
  zone: { name: string } | null;
}

// ─── Status pill ──────────────────────────────────────────────────────────────

const STATUS_STYLE: Record<ViolationStatus, string> = {
  PENDING:   "text-amber-700 bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800 dark:text-amber-400",
  CONFIRMED: "text-red-700 bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-800 dark:text-red-400",
};

function StatusPill({ status }: { status: ViolationStatus }) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide", STATUS_STYLE[status])}>
      <span className={cn("h-1.5 w-1.5 rounded-full", status === "PENDING" ? "bg-amber-500" : "bg-red-500")} />
      {status}
    </span>
  );
}

// ─── Violation result card ────────────────────────────────────────────────────

function ViolationCard({ v }: { v: Violation }) {
  return (
    <Card className="overflow-hidden">
      <div className={cn("h-0.5 w-full", v.status === "CONFIRMED" ? "bg-destructive" : "bg-amber-400")} />
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          {/* Left: details */}
          <div className="min-w-0 flex-1 space-y-3">
            {/* Vehicle + status */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5">
                <Car className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                <span className="font-bold text-sm tracking-widest">{v.vehicle.plateNumber}</span>
              </div>
              <span className="text-muted-foreground text-xs">·</span>
              <span className="text-xs text-muted-foreground truncate">{v.vehicle.name}</span>
              <StatusPill status={v.status} />
            </div>

            {/* Speed row */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1.5 rounded-md bg-destructive/8 border border-destructive/20 px-2.5 py-1">
                <Gauge className="h-3.5 w-3.5 text-destructive" />
                <span className="text-xs font-bold text-destructive">{v.speed} km/h</span>
              </div>
              <span className="text-xs text-muted-foreground">in a {v.speedLimit} km/h zone</span>
              <span className="text-xs font-medium text-orange-600">+{v.excessSpeed} km/h over</span>
            </div>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              {v.zone && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {v.zone.name}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {format(new Date(v.timestamp), "dd MMM yyyy, HH:mm")}
              </span>
            </div>
          </div>

          {/* Right: fine + pay */}
          <div className="flex flex-col items-end gap-3 shrink-0">
            <div className="text-right">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Fine</p>
              <p className="text-xl font-black text-foreground leading-tight">
                {v.fineAmount > 0 ? (
                  <>RWF <span className="text-destructive">{v.fineAmount.toLocaleString()}</span></>
                ) : (
                  <span className="text-muted-foreground text-sm font-medium">Pending</span>
                )}
              </p>
            </div>
            <Button asChild size="sm" className="h-8 gap-1.5 text-xs font-semibold px-4">
              <Link href={`/payments/${v.id}`}>
                <CreditCard className="h-3.5 w-3.5" />
                Pay Fine
                <ChevronRight className="h-3 w-3" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PaymentsPage() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [plate, setPlate]           = useState("");
  const [violations, setViolations] = useState<Violation[] | null>(null);
  const [searched, setSearched]     = useState(false);
  const [error, setError]           = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const totalDue = violations?.reduce((s, v) => s + v.fineAmount, 0) ?? 0;

  const handleSearch = () => {
    const q = plate.trim().toUpperCase();
    if (!q) { inputRef.current?.focus(); return; }

    setError(null);
    setViolations(null);
    setSearched(false);

    startTransition(async () => {
      try {
        const res = await fetch(
          `/api/violations/search?plate=${encodeURIComponent(q)}&status=PENDING,CONFIRMED`
        );
        if (!res.ok) throw new Error((await res.json()).error || "Search failed");
        const data = await res.json();
        // Only keep PENDING + CONFIRMED
        const filtered = (data?.data ?? data ?? []).filter(
          (v: Violation) => v.status === "PENDING" || v.status === "CONFIRMED"
        );
        setViolations(filtered);
        setSearched(true);
      } catch (e: any) {
        setError(e.message);
        setSearched(true);
      }
    });
  };

  const handleClear = () => {
    setPlate("");
    setViolations(null);
    setSearched(false);
    setError(null);
    inputRef.current?.focus();
  };

  const hasResults = violations !== null && violations.length > 0;
  const showIdle   = !isPending && !searched;
  const showEmpty  = !isPending && searched && !error && violations?.length === 0;

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col bg-background">
      {/*
       * Layout strategy:
       * – Before search: search box is vertically centred in the full viewport
       * – After search:  search box pins to top, results scroll below
       */}
      <div
        className={cn(
          "flex flex-col w-full transition-all",
          showIdle ? "flex-1 items-center justify-center" : "pt-10 pb-4 border-b bg-muted/20"
        )}
      >
        <div className="w-full max-w-xl px-4 mx-auto space-y-5">
          {/* Heading — only while idle */}
          {showIdle && (
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-destructive/10 mb-2">
                <ShieldAlert className="h-6 w-6 text-destructive" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight">Pay a Traffic Fine</h1>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                Enter your vehicle plate number to find outstanding fines and pay securely online.
              </p>
            </div>
          )}

          {/* Compact heading after search */}
          {!showIdle && (
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-destructive" />
              <span className="text-sm font-semibold">Pay a Traffic Fine</span>
            </div>
          )}

          {/* Search bar */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Car className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                ref={inputRef}
                className="pl-10 pr-9 h-12 text-sm font-mono uppercase tracking-widest placeholder:normal-case placeholder:tracking-normal placeholder:font-sans"
                placeholder="e.g. RAC 123 A"
                value={plate}
                onChange={(e) => setPlate(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                autoFocus
              />
              {plate && (
                <button
                  onClick={handleClear}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <Button
              onClick={handleSearch}
              disabled={!plate.trim() || isPending}
              className="h-12 px-6 font-semibold text-sm shrink-0"
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </>
              )}
            </Button>
          </div>

          {/* Hint */}
          {showIdle && (
            <p className="text-center text-xs text-muted-foreground">
              Only <span className="font-medium text-foreground">Pending</span> and{" "}
              <span className="font-medium text-foreground">Confirmed</span> violations are shown
            </p>
          )}
        </div>
      </div>

      {/* ── Results area ── */}
      <div className="flex-1 w-full max-w-xl mx-auto px-4 py-6 space-y-4">

        {/* Loading */}
        {isPending && (
          <div className="flex flex-col items-center gap-3 py-20 text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin" />
            <p className="text-sm">Searching for violations…</p>
          </div>
        )}

        {/* Error */}
        {!isPending && error && (
          <Card className="border-destructive/30 bg-destructive/5">
            <CardContent className="flex items-center gap-3 py-4 px-4">
              <AlertTriangle className="h-5 w-5 shrink-0 text-destructive" />
              <div>
                <p className="text-sm font-medium text-destructive">Search Failed</p>
                <p className="text-xs text-muted-foreground mt-0.5">{error}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* No results */}
        {showEmpty && (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
              <ShieldAlert className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <p className="font-semibold text-sm">No outstanding fines</p>
              <p className="text-xs text-muted-foreground mt-1">
                No pending or confirmed violations found for{" "}
                <span className="font-mono font-semibold text-foreground">{plate}</span>
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950/30 dark:border-emerald-800 dark:text-emerald-400">
              ✓ Clean record
            </span>
          </div>
        )}

        {/* Results */}
        {!isPending && hasResults && (
          <>
            {/* Summary bar */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{violations!.length}</span>{" "}
                {violations!.length === 1 ? "violation" : "violations"} found for{" "}
                <span className="font-mono font-semibold text-foreground">{plate}</span>
              </p>
              {totalDue > 0 && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Banknote className="h-3.5 w-3.5" />
                  Total:{" "}
                  <span className="font-bold text-destructive">
                    RWF {totalDue.toLocaleString()}
                  </span>
                </div>
              )}
            </div>

            {/* Cards */}
            <div className="space-y-3">
              {violations!.map((v) => (
                <ViolationCard key={v.id} v={v} />
              ))}
            </div>

            {/* Pay all — only when 2+ violations */}
            {violations!.length > 1 && totalDue > 0 && (
              <>
                <Separator />
                <Card className="border-destructive/20 bg-destructive/5">
                  <CardContent className="flex items-center justify-between gap-4 py-4 px-5">
                    <div>
                      <p className="text-sm font-semibold">
                        {violations!.length} unpaid fines
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Total amount due:{" "}
                        <span className="font-bold text-destructive">
                          RWF {totalDue.toLocaleString()}
                        </span>
                      </p>
                    </div>
                    {/* Wire to a bulk-pay flow if available */}
                    <Button
                      size="sm"
                      variant="destructive"
                      className="shrink-0 gap-1.5 text-xs font-semibold"
                      onClick={() => router.push(`/payments/${violations![0].id}`)}
                    >
                      <CreditCard className="h-3.5 w-3.5" />
                      Pay First Fine
                    </Button>
                  </CardContent>
                </Card>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}