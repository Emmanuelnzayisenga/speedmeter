"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
  Search,
  Car,
  Phone,
  Hash,
  ShieldAlert,
  Gauge,
  MapPin,
  Clock,
  Banknote,
  CreditCard,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  FileText,
  Loader2,
  SlidersHorizontal,
  X,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────

type ViolationStatus = "PENDING" | "CONFIRMED" | "DISPUTED" | "RESOLVED" | "CANCELLED";
type SearchMode = "plate" | "phone" | "id";

interface Violation {
  id: string;
  vehicleId: string;
  latitude: number;
  longitude: number;
  speed: number;
  speedLimit: number;
  excessSpeed: number;
  fineAmount: number;
  status: ViolationStatus;
  notes: string | null;
  timestamp: string;
  resolvedAt: string | null;
  createdAt: string;
  vehicle: { name: string; plateNumber: string; driverPhone?: string };
  zone: { name: string } | null;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  ViolationStatus,
  { label: string; color: string; icon: React.ElementType; dot: string }
> = {
  PENDING: { label: "Pending", color: "text-amber-600 bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800", icon: Clock, dot: "bg-amber-500" },
  CONFIRMED: { label: "Confirmed", color: "text-red-600 bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-800", icon: AlertTriangle, dot: "bg-red-500" },
  DISPUTED: { label: "Disputed", color: "text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800", icon: FileText, dot: "bg-blue-500" },
  RESOLVED: { label: "Resolved", color: "text-emerald-600 bg-emerald-50 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-800", icon: CheckCircle2, dot: "bg-emerald-500" },
  CANCELLED: { label: "Cancelled", color: "text-muted-foreground bg-muted border-border", icon: XCircle, dot: "bg-muted-foreground" },
};

const SEARCH_MODES: { value: SearchMode; label: string; icon: React.ElementType; placeholder: string }[] = [
  { value: "plate", label: "Plate Number", icon: Car, placeholder: "e.g. RAC 123A" },
  { value: "phone", label: "Phone Number", icon: Phone, placeholder: "e.g. +250 789 123 456" },
  { value: "id", label: "Violation ID", icon: Hash, placeholder: "e.g. clx8f..." },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function StatusPill({ status }: { status: ViolationStatus }) {
  const cfg = STATUS_CONFIG[status];
  const Icon = cfg.icon;
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium", cfg.color)}>
      <Icon className="h-3 w-3" />
      {cfg.label}
    </span>
  );
}

function SeverityBar({ excess }: { excess: number }) {
  const pct = Math.min(100, (excess / 60) * 100);
  const color = excess < 15 ? "bg-amber-400" : excess < 30 ? "bg-orange-500" : "bg-destructive";
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-20 rounded-full bg-muted overflow-hidden">
        <div className={cn("h-full rounded-full transition-all", color)} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs text-muted-foreground">+{excess} km/h over</span>
    </div>
  );
}

function ViolationCard({ v, onPay }: { v: Violation; onPay: (id: string) => void }) {
  const canPay = (v.status === "PENDING" || v.status === "CONFIRMED") && v.fineAmount > 0;

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-md hover:-translate-y-0.5 duration-200">
      {/* Top accent strip */}
      <div className={cn("h-1 w-full", STATUS_CONFIG[v.status].dot)} />

      <CardContent className="p-4 space-y-3">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
              <Car className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-sm truncate">{v.vehicle.plateNumber}</p>
              <p className="text-xs text-muted-foreground truncate">{v.vehicle.name}</p>
            </div>
          </div>
          <StatusPill status={v.status} />
        </div>

        <Separator />

        {/* Speed info */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-md bg-muted/60 py-2 px-1">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Recorded</p>
            <p className="text-sm font-bold text-destructive">{v.speed} <span className="text-[10px] font-normal">km/h</span></p>
          </div>
          <div className="rounded-md bg-muted/60 py-2 px-1">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Limit</p>
            <p className="text-sm font-bold">{v.speedLimit} <span className="text-[10px] font-normal">km/h</span></p>
          </div>
          <div className="rounded-md bg-muted/60 py-2 px-1">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Excess</p>
            <p className="text-sm font-bold text-orange-500">+{v.excessSpeed} <span className="text-[10px] font-normal">km/h</span></p>
          </div>
        </div>

        {/* Meta */}
        <div className="space-y-1.5 text-xs text-muted-foreground">
          {v.zone && (
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3 w-3 shrink-0" />
              <span className="truncate">{v.zone.name}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Clock className="h-3 w-3 shrink-0" />
            <span>{format(new Date(v.timestamp), "dd MMM yyyy, HH:mm")}</span>
          </div>
        </div>

        {/* Fine + action */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Fine</p>
            <p className={cn("text-lg font-bold", v.fineAmount > 0 ? "text-foreground" : "text-muted-foreground")}>
              {v.fineAmount > 0 ? `RWF ${v.fineAmount.toLocaleString()}` : "—"}
            </p>
          </div>
          {canPay ? (
            <Button size="sm" className="gap-1.5 h-8 text-xs" onClick={() => onPay(v.id)}>
              <CreditCard className="h-3.5 w-3.5" />
              Pay Fine
              <ChevronRight className="h-3 w-3" />
            </Button>
          ) : v.status === "RESOLVED" ? (
            <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
              <CheckCircle2 className="h-4 w-4" /> Paid
            </span>
          ) : (
            <Button size="sm" variant="outline" className="gap-1.5 h-8 text-xs" onClick={() => onPay(v.id)}>
              <FileText className="h-3.5 w-3.5" />
              Details
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Stats summary ────────────────────────────────────────────────────────────

function ResultsSummary({ violations }: { violations: Violation[] }) {
  const pending = violations.filter(v => v.status === "PENDING" || v.status === "CONFIRMED");
  const totalDue = pending.reduce((s, v) => s + v.fineAmount, 0);
  const resolved = violations.filter(v => v.status === "RESOLVED").length;

  return (
    <div className="grid grid-cols-3 gap-3">
      {[
        { label: "Total Violations", value: violations.length, icon: ShieldAlert, color: "text-foreground" },
        { label: "Unpaid Fines", value: `RWF ${totalDue.toLocaleString()}`, icon: Banknote, color: "text-destructive" },
        { label: "Resolved", value: resolved, icon: CheckCircle2, color: "text-emerald-600" },
      ].map(({ label, value, icon: Icon, color }) => (
        <Card key={label}>
          <CardContent className="p-3 text-center">
            <Icon className={cn("h-4 w-4 mx-auto mb-1", color)} />
            <p className={cn("text-lg font-bold", color)}>{value}</p>
            <p className="text-[10px] text-muted-foreground leading-tight">{label}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function CheckFinesPage() {
  const router = useRouter();
  const [mode, setMode] = useState<SearchMode>("plate");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ViolationStatus | "ALL">("ALL");
  const [violations, setViolations] = useState<Violation[] | null>(null);
  const [searched, setSearched] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const currentMode = SEARCH_MODES.find(m => m.value === mode)!;

  const handleSearch = () => {
    const q = query.trim();
    if (!q) return;

    setError(null);
    setViolations(null);
    setSearched(false);

    startTransition(async () => {
      try {
        const params = new URLSearchParams({ [mode]: q });
        const res = await fetch(`/api/violations/search?${params.toString()}`);
        if (!res.ok) throw new Error((await res.json()).error || "Search failed");
        const data = await res.json();
        setViolations(data?.data ?? data ?? []);
        setSearched(true);
      } catch (e: any) {
        setError(e.message);
        setSearched(true);
      }
    });
  };

  const handleClear = () => {
    setQuery("");
    setViolations(null);
    setSearched(false);
    setError(null);
    setStatusFilter("ALL");
  };

  const filteredViolations = violations
    ? statusFilter === "ALL"
      ? violations
      : violations.filter(v => v.status === statusFilter)
    : [];

  const hasResults = violations !== null && violations.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="flex m-2">
        <button className="text-primary font-bolder" onClick={() => {
          window.navigation.back()
        }}> <ArrowLeft /></button>
      </div>
      <div className="border-b bg-muted/30 h-full">
        <div className="mx-auto max-w-2xl px-4 py-8 space-y-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-destructive/10">
              <ShieldAlert className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Traffic Fine Lookup</h1>
              <p className="text-xs text-muted-foreground">Search outstanding violations by plate, phone, or ID</p>
            </div>
          </div>

          <Tabs value={mode} onValueChange={(v) => { setMode(v as SearchMode); setQuery(""); }}>
            <TabsList className="w-full">
              {SEARCH_MODES.map(m => {
                const Icon = m.icon;
                return (
                  <TabsTrigger key={m.value} value={m.value} className="flex-1 gap-1.5 text-xs">
                    <Icon className="h-3.5 w-3.5" />
                    {m.label}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <currentMode.icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-9 pr-9 h-11 text-sm"
                placeholder={currentMode.placeholder}
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSearch()}
                autoFocus
              />
              {query && (
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={handleClear}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <Button
              className="h-11 px-5 shrink-0"
              onClick={handleSearch}
              disabled={!query.trim() || isPending}
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Quick tips */}
          {!searched && (
            <div className="flex flex-wrap gap-2">
              {["RAC 123A", "+250 789 123 456", "Violation ID"].map(tip => (
                <span key={tip} className="rounded-md border bg-background px-2.5 py-1 text-[11px] text-muted-foreground font-mono">
                  {tip}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Results section ── */}
      <div className="mx-auto max-w-2xl px-4 py-6 space-y-5">

        {/* Loading */}
        {isPending && (
          <div className="flex flex-col items-center gap-3 py-16 text-muted-foreground">
            <Loader2 className="h-7 w-7 animate-spin" />
            <p className="text-sm">Searching violations…</p>
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
        {!isPending && searched && !error && violations?.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium text-sm">No violations found</p>
              <p className="text-xs text-muted-foreground mt-1">
                No traffic fines are linked to <span className="font-mono font-medium">{query}</span>
              </p>
            </div>
            <Badge variant="outline" className="text-xs text-emerald-600 border-emerald-200 bg-emerald-50 gap-1.5">
              <CheckCircle2 className="h-3 w-3" /> Clean record
            </Badge>
          </div>
        )}

        {/* Results */}
        {!isPending && hasResults && (
          <>
            {/* Summary stats */}
            <ResultsSummary violations={violations!} />

            {/* Filter bar */}
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{filteredViolations.length}</span>{" "}
                {filteredViolations.length === 1 ? "violation" : "violations"}
                {statusFilter !== "ALL" && ` · ${STATUS_CONFIG[statusFilter].label}`}
              </p>
              <div className="flex items-center gap-1.5">
                <SlidersHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
                <Select
                  value={statusFilter}
                  onValueChange={v => setStatusFilter(v as ViolationStatus | "ALL")}
                >
                  <SelectTrigger className="h-8 w-36 text-xs">
                    <SelectValue placeholder="Filter status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All statuses</SelectItem>
                    {Object.entries(STATUS_CONFIG).map(([k, v]) => (
                      <SelectItem key={k} value={k} className="text-xs">
                        <span className="flex items-center gap-1.5">
                          <span className={cn("h-2 w-2 rounded-full", v.dot)} />
                          {v.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Cards grid */}
            {filteredViolations.length === 0 ? (
              <p className="text-center text-sm text-muted-foreground py-8">
                No violations match the selected filter.
              </p>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {filteredViolations.map(v => (
                  <ViolationCard
                    key={v.id}
                    v={v}
                    onPay={id => router.push(`/payments/${id}`)}
                  />
                ))}
              </div>
            )}

            {/* Pay all CTA if multiple unpaid */}
            {violations!.filter(v => (v.status === "PENDING" || v.status === "CONFIRMED") && v.fineAmount > 0).length > 1 && (
              <Card className="border-destructive/20 bg-destructive/5">
                <CardContent className="flex items-center justify-between gap-3 py-3 px-4">
                  <div>
                    <p className="text-sm font-semibold text-destructive">Multiple unpaid fines</p>
                    <p className="text-xs text-muted-foreground">
                      Total due:{" "}
                      <span className="font-medium text-foreground">
                        RWF{" "}
                        {violations!
                          .filter(v => v.status === "PENDING" || v.status === "CONFIRMED")
                          .reduce((s, v) => s + v.fineAmount, 0)
                          .toLocaleString()}
                      </span>
                    </p>
                  </div>
                  <Button size="sm" variant="destructive" className="shrink-0 text-xs gap-1.5">
                    <Banknote className="h-3.5 w-3.5" />
                    Pay All
                  </Button>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
}