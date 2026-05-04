"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { format } from "date-fns";
import {
  ShieldAlert,
  Car,
  MapPin,
  Gauge,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  AlertTriangle,
  Receipt,
  ArrowLeft,
  Banknote,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
 

// ─── Types ───────────────────────────────────────────────────────────────────

type ViolationStatus = "PENDING" | "CONFIRMED" | "DISPUTED" | "RESOLVED" | "CANCELLED";

interface Violation {
  id: string;
  vehicleId: string;
  zoneId: string | null;
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
  updatedAt: string;
  vehicle: {
    name: string;
    plateNumber: string;
  };
  zone: {
    name: string;
  } | null;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  ViolationStatus,
  { label: string; variant: "default" | "secondary" | "destructive" | "outline"; icon: React.ElementType }
> = {
  PENDING:   { label: "Pending",   variant: "outline",     icon: Clock        },
  CONFIRMED: { label: "Confirmed", variant: "destructive", icon: AlertTriangle },
  DISPUTED:  { label: "Disputed",  variant: "secondary",   icon: FileText     },
  RESOLVED:  { label: "Resolved",  variant: "default",     icon: CheckCircle2 },
  CANCELLED: { label: "Cancelled", variant: "secondary",   icon: XCircle      },
};

function StatusBadge({ status }: { status: ViolationStatus }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.PENDING;
  const Icon = cfg.icon;
  return (
    <Badge variant={cfg.variant} className="gap-1.5 px-2.5 py-1 text-xs font-medium">
      <Icon className="h-3 w-3" />
      {cfg.label}
    </Badge>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
  highlight,
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-start gap-3 py-3">
      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-muted">
        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className={`text-sm font-medium mt-0.5 ${highlight ? "text-destructive" : "text-foreground"}`}>
          {value}
        </p>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PayViolationPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [violation, setViolation] = useState<Violation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paid, setPaid] = useState(false);

  // ── Fetch violation ──
  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await fetch(`/api/violations/${id}`);
        if (!res.ok) throw new Error((await res.json()).error || "Violation not found");
        const data: Violation = await res.json();
        setViolation(data);
        if (data.status === "RESOLVED") setPaid(true);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  // ── Flutterwave config ──
  const [txRef] = useState(() => `VIO_${crypto.randomUUID()}`);

  const fwConfig = {
    public_key: `${process.env.NEXT_PUBLIC_FW_PUBLIC_KEY}`,
    tx_ref: txRef,
    amount: violation?.fineAmount ?? 0,
    currency: "RWF",
    payment_options: "mobilemoney,card",
    customer: {
      email: "driver@example.com",
      phone_number: violation?.vehicle ? "" : "",
      name: violation?.vehicle?.name ?? "Driver",
    },
    customizations: {
      title: "Traffic Fine Payment",
      description: `Pay fine for violation ${id}`,
      logo: "https://onecard-1.onrender.com/logo.png",
    },
  };

  const handleFlutterPayment = useFlutterwave(fwConfig);

  // ── Pay handler ──
  const handlePay = () => {
    if (!violation) return;
    setPaymentLoading(true);

    handleFlutterPayment({
      callback: async (response: any) => {
        closePaymentModal();

        if (response.status === "successful") {
          try {
            // Verify payment
            const verifyRes = await fetch(`/api/payment/verify`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });
            const verified = await verifyRes.json();

            if (verified.success && verified.data?.status === "successful") {
              // Update violation status to RESOLVED
              const updateRes = await fetch(`/api/violations/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  status: "RESOLVED",
                  notes: `Paid via Flutterwave. Ref: ${response.transaction_id}`,
                }),
              });

              if (!updateRes.ok) throw new Error("Failed to update violation status");

              const updated: Violation = await updateRes.json();
              setViolation(updated);
              setPaid(true);
              toast.success("Fine paid successfully! Violation resolved.");
            } else {
              toast.error("Payment could not be verified. Please contact support.");
            }
          } catch (e: any) {
            toast.error(e.message || "An error occurred after payment.");
          }
        } else {
          toast.error("Payment was not completed. Please try again.");
        }

        setPaymentLoading(false);
      },
      onClose: () => {
        setPaymentLoading(false);
        toast.warning("Payment was cancelled.");
      },
    });
  };

  // ── Loading state ──
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className="text-sm">Loading violation details…</p>
        </div>
      </div>
    );
  }

  // ── Error state ──
  if (error || !violation) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-10 pb-8 space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
              <XCircle className="h-7 w-7 text-destructive" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Violation Not Found</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {error ?? "The violation you're looking for doesn't exist or has been removed."}
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const canPay =
    (violation.status === "PENDING" || violation.status === "CONFIRMED") &&
    violation.fineAmount > 0 &&
    !paid;

  // ── Success state ──
  if (paid) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-10 pb-8 space-y-5">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Fine Paid</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Your traffic violation fine has been paid and the case is resolved.
              </p>
            </div>
            <div className="rounded-lg border bg-muted/40 px-4 py-3 text-left space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Violation ID</span>
                <span className="font-mono font-medium text-xs">{violation.id}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Amount Paid</span>
                <span className="font-semibold text-primary">
                  RWF {violation.fineAmount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <StatusBadge status={violation.status} />
              </div>
            </div>
            <Button variant="outline" className="w-full" onClick={() => router.push("/")}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Return Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ── Main render ──
  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-14 max-w-2xl items-center gap-3 px-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2 min-w-0">
            <ShieldAlert className="h-4 w-4 shrink-0 text-destructive" />
            <span className="truncate text-sm font-medium">Traffic Violation Fine</span>
          </div>
          <div className="ml-auto">
            <StatusBadge status={violation.status} />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-2xl space-y-4 p-4 pb-10">
        {/* Alert for non-payable states */}
        {!canPay && !paid && (
          <Card className="border-muted bg-muted/30">
            <CardContent className="flex items-center gap-3 py-3 px-4">
              <AlertTriangle className="h-4 w-4 shrink-0 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                {violation.status === "CANCELLED"
                  ? "This violation has been cancelled and no payment is required."
                  : violation.status === "DISPUTED"
                  ? "This violation is under dispute. Payment is suspended pending review."
                  : violation.fineAmount === 0
                  ? "No fine amount has been set for this violation yet."
                  : "This violation cannot be paid at this time."}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Fine amount hero */}
        <Card className="overflow-hidden">
          <div className="bg-destructive/5 border-b px-6 py-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                  Fine Amount Due
                </p>
                <p className="text-4xl font-bold tracking-tight">
                  RWF{" "}
                  <span className="text-destructive">
                    {violation.fineAmount.toLocaleString()}
                  </span>
                </p>
              </div>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-destructive/10">
                <Banknote className="h-6 w-6 text-destructive" />
              </div>
            </div>
          </div>

          <CardContent className="p-0">
            <div className="divide-y px-6">
              <DetailRow
                icon={Car}
                label="Vehicle"
                value={`${violation.vehicle.name} — ${violation.vehicle.plateNumber}`}
              />
              <DetailRow
                icon={Gauge}
                label="Speed Recorded"
                value={
                  <span>
                    <span className="text-destructive font-semibold">{violation.speed} km/h</span>
                    {" "}in a {violation.speedLimit} km/h zone
                    {" "}
                    <span className="text-xs text-muted-foreground">
                      (+{violation.excessSpeed} km/h over limit)
                    </span>
                  </span>
                }
                highlight
              />
              {violation.zone && (
                <DetailRow
                  icon={MapPin}
                  label="Zone"
                  value={violation.zone.name}
                />
              )}
              <DetailRow
                icon={MapPin}
                label="Location"
                value={`${violation.latitude.toFixed(5)}, ${violation.longitude.toFixed(5)}`}
              />
              <DetailRow
                icon={Clock}
                label="Recorded At"
                value={format(new Date(violation.timestamp), "dd MMM yyyy, HH:mm")}
              />
              {violation.notes && (
                <DetailRow
                  icon={FileText}
                  label="Notes"
                  value={violation.notes}
                />
              )}
            </div>
          </CardContent>
        </Card>

        {/* Payment summary */}
        {canPay && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Receipt className="h-4 w-4" />
                Payment Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-lg bg-muted/50 divide-y">
                <div className="flex justify-between px-3 py-2.5 text-sm">
                  <span className="text-muted-foreground">Violation fine</span>
                  <span className="font-medium">RWF {violation.fineAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between px-3 py-2.5 text-sm">
                  <span className="text-muted-foreground">Processing fee</span>
                  <span className="text-muted-foreground">Included</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between text-sm font-semibold">
                <span>Total Due</span>
                <span className="text-destructive text-base">
                  RWF {violation.fineAmount.toLocaleString()}
                </span>
              </div>

              <Button
                className="w-full mt-2 h-11 text-sm font-semibold"
                disabled={paymentLoading}
                onClick={handlePay}
              >
                {paymentLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing…
                  </>
                ) : (
                  <>
                    <Banknote className="mr-2 h-4 w-4" />
                    Pay RWF {violation.fineAmount.toLocaleString()} Now
                  </>
                )}
              </Button>

              <p className="text-center text-xs text-muted-foreground pt-1">
                Secured by Flutterwave · Mobile Money & Card accepted
              </p>
            </CardContent>
          </Card>
        )}

        {/* Violation ID */}
        <p className="text-center text-xs text-muted-foreground font-mono">
          Ref: {violation.id}
        </p>
      </div>
    </div>
  );
}