"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  ShieldCheck,
  Loader2, Mail,
  Clock,
  Lock,
  AlertCircle,
  CheckCircle2
} from "lucide-react";
import GridBackground from "@/components/ui/GridBackground";
import {
  useFinalizeLogin,
  useResendOtp,
  useVerifyRegistration,
  useVerifyResetPasswordToken,
} from "@/hooks/useAuthHooks";
import { toast } from "sonner";
import {
  otpSchema, OTPValues,
  NewPasswordValues,
  resendOtpSchema
} from "@/lib/validations/auth.schema";

export default function VerifyOTP() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const type = searchParams.get("type") as
    | "LOGIN_OTP"
    | "REGISTRATION"
    | "PASSWORD_RESET"
    | null;

  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const finalizeLoginMutation = useFinalizeLogin();
  const verifyRegistrationMutation = useVerifyRegistration();
  const resetPasswordMutation = useVerifyResetPasswordToken();
  const resendOtpMutation= useResendOtp()

  // Redirect if no email or type
  useEffect(() => {
    if (!email || !type) {
      toast.error("Invalid verification request");
      router.push("/login");
    }
  }, [email, type, router]);

  // Get the appropriate mutation
  const getMutation = () => {
    switch (type) {
      case "LOGIN_OTP":
        return finalizeLoginMutation;
      case "REGISTRATION":
        return verifyRegistrationMutation;
      case "PASSWORD_RESET":
        return resetPasswordMutation;
      default:
        return finalizeLoginMutation;
    }
  };

  const mutation = getMutation();

  // Initialize form
  const form = useForm<OTPValues | NewPasswordValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  // Countdown timer
  useEffect(() => {
    if (countdown > 0 && type !== "PASSWORD_RESET") {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCanResend(true);
    }
  }, [countdown, type]);

  const onSubmit = (data: OTPValues | NewPasswordValues) => {
    const otpData = data as OTPValues;
    if (type === "PASSWORD_RESET") {
      resetPasswordMutation.mutate({
        identifier: email!,
        otp: otpData.otp,
      });
    } else {
      if (type === "LOGIN_OTP") {
        finalizeLoginMutation.mutate({ email: email!, otp: otpData.otp });
      } else if (type === "REGISTRATION") {
        verifyRegistrationMutation.mutate({
          identifier: email!,
          otp: otpData.otp,
        });
      }
    }
  };

  const handleResend = async () => {
    if (email && type) {
      resendOtpMutation.mutate({email, type})
    }
  };

  const getFlowIcon = () => {
    if (mutation.isSuccess) {
      return <CheckCircle2 className="w-8 h-8 text-green-500" />;
    }

    switch (type) {
      case "PASSWORD_RESET":
        return <Lock className="w-8 h-8 text-primary" />;
      case "REGISTRATION":
        return <Mail className="w-8 h-8 text-primary" />;
      default:
        return <ShieldCheck className="w-8 h-8 text-primary" />;
    }
  };

  const getFlowTitle = () => {
    if (mutation.isSuccess) {
      return "Success!";
    }

    switch (type) {
      case "REGISTRATION":
        return "Verify your email";
      case "PASSWORD_RESET":
        return "Reset your password";
      default:
        return "Two-factor authentication";
    }
  };

  const getFlowDescription = () => {
    if (mutation.isSuccess) {
      return type === "PASSWORD_RESET"
        ? "Your password has been reset successfully."
        : "Verification completed successfully.";
    }

    switch (type) {
      case "REGISTRATION":
        return "We've sent a verification code to complete your registration";
      case "PASSWORD_RESET":
        return "We've sent a code to verify your identity. Then you can set a new password.";
      default:
        return "For added security, please enter the 6-digit code sent to your device";
    }
  };

  const getIllustration = () => {
    switch (type) {
      case "PASSWORD_RESET":
        return "/svgs/forgot-password.svg";
      case "REGISTRATION":
        return "/svgs/verification.svg";
      default:
        return "/svgs/otp.svg";
    }
  };

  // If no email or type, don't render (will redirect)
  if (!email || !type) {
    return null;
  }

  return (
    <div className="relative min-h-screen grid grid-cols-1 lg:grid-cols-3 w-full">
      {/* Background layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <GridBackground />
      </div>

      {/* Illustration Section */}
      <div className="hidden lg:flex lg:col-span-2 items-center justify-center p-12 relative z-10 border-r border-border/50 bg-muted/10 backdrop-blur-sm">
        <div className="max-w-3xl w-full">
          <img
            src={getIllustration()}
            alt="Verification Illustration"
            className="w-full h-auto drop-shadow-2xl transition-transform hover:scale-105 duration-700"
          />
        </div>
      </div>

      {/* Form Section */}
      <div className="flex flex-col items-center justify-center p-6 sm:p-12 relative z-10 w-full min-h-screen bg-background/50 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center">
          <img
            src="/logo.png"
            alt="OneCard Logo"
            className="h-12 w-auto mb-4"
          />
        </div>

        <Card className="w-full max-w-md shadow-xl border-border/50 bg-background/80 backdrop-blur-md">
          <CardHeader className="space-y-2 pb-6 pt-12">
            <div
              className={`w-16 h-16 ${mutation.isSuccess ? "bg-green-100 dark:bg-green-900/20" : "bg-primary/10"} rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300`}
            >
              {getFlowIcon()}
            </div>
            <CardTitle className="text-3xl font-bold text-center tracking-tight">
              {getFlowTitle()}
            </CardTitle>
            <CardDescription className="text-center text-base px-6">
              {getFlowDescription()}
            </CardDescription>

            {/* Email Display */}
            {!mutation.isSuccess && (
              <div className="mt-4 p-3 bg-muted/50 rounded-lg border border-border/50 flex items-center justify-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">
                  {email}
                </span>
              </div>
            )}
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                {/* OTP Field */}
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <Label
                        htmlFor="otp"
                        className="font-semibold text-center block"
                      >
                        {type === "PASSWORD_RESET"
                          ? "Enter Reset Token"
                          : "Enter 6-digit Security Code"}
                      </Label>
                      <FormControl>
                        <Input
                          id="otp"
                          type="text"
                          inputMode="numeric"
                          autoComplete="one-time-code"
                          maxLength={6}
                          placeholder="• • • • • •"
                          disabled={mutation.isPending}
                          className="h-14 bg-background text-center text-2xl tracking-[0.5em] font-mono border-2 focus:border-primary"
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "");
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Timer */}
                {type !== "PASSWORD_RESET" && !canResend && (
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Resend code in {countdown} seconds</span>
                  </div>
                )}

                {/* Error Display */}
                {mutation.isError && (
                  <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 p-3 rounded-md flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    {mutation.error instanceof Error
                      ? mutation.error.message
                      : "Verification failed. Please try again."}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full h-11 rounded-full text-base font-medium mt-4 transition-all shadow-md hover:shadow-lg"
                  disabled={mutation.isPending || resendOtpMutation.isPending}
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      {"Verifying..."}
                    </>
                  ) : type === "PASSWORD_RESET" ? (
                    "Verify & Continue"
                  ) : (
                    "Verify & Continue"
                  )}
                </Button>

                {/* Resend Option */}
                {
                  <div className="text-center mt-4">
                    {canResend ? (
                      <Button
                        type="button"
                        onClick={handleResend}
                        disabled={resendOtpMutation.isPending}
                        variant={"outline"}
                         className="w-full h-11 rounded-full text-base font-medium mt-4 transition-all shadow-md hover:shadow-lg"
                      >
                        {resendOtpMutation.isPending
                          ? "Sending..."
                          : "Didn't receive code? Resend"}
                      </Button>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Check your inbox or spam folder
                      </p>
                    )}
                  </div>
                }

                {/* Help Link */}
                <p className="text-xs text-center text-muted-foreground mt-6">
                  Having trouble?{" "}
                  <Link
                    href="/contact-support"
                    className="text-primary hover:underline"
                  >
                    Contact support
                  </Link>
                </p>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
