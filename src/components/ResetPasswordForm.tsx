"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { EyeOff, AlertCircle, Eye } from "lucide-react";
import { KeyRound, Loader2 } from "lucide-react";
import Link from "next/link";
import GridBackground from "@/components/ui/GridBackground";
import {
  useResetPassword,
  useCheckVerifyResetPasswordToken,
} from "@/hooks/useAuthHooks";
import { toast } from "sonner";
import {
  resetNewPasswordSchema,
  ResetPasswordValues,
} from "@/lib/validations/auth.schema";

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const [viewPassword, setViewPassword] = useState(false);
  const resetPasswordMutation = useResetPassword();
  const hasChecked = useRef(false);
  const checkInitialCheckMutation = useCheckVerifyResetPasswordToken();

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetNewPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: ResetPasswordValues) => {
    resetPasswordMutation.mutate(
      {
        token: token!,
        password: data.newPassword,
      },
      {
        onSuccess: () => {
          toast.success("Password reset successful!");
        },
      },
    );
  };

  useEffect(() => {
    if (hasChecked.current) return;
    hasChecked.current = true;
    checkInitialCheckMutation.mutate({ identifier: email, token });
  }, []);

  // Main reset password form
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
            src="/svgs/create-new-password.svg"
            alt="Create New Password"
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
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <KeyRound className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold text-center tracking-tight">
              Create New Password
            </CardTitle>
            <CardDescription className="text-center text-base px-6">
              Your new password must be different from previously used
              passwords.
            </CardDescription>
          </CardHeader>

          <CardContent>
             
              <div >
                <Form {...form} >
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-5"
                  >
                    {/* New Password Field */}
                    <FormField
                      control={form.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <Label
                            htmlFor="newPassword"
                            className="font-semibold"
                          >
                            New Password
                          </Label>
                          <div className="relative">
                            <FormControl>
                              <Input
                                id="newPassword"
                                type={viewPassword ? "text" : "password"}
                                placeholder="••••••••"
                                disabled={resetPasswordMutation.isPending}
                                className="h-11 pr-10 bg-background"
                                {...field}
                              />
                            </FormControl>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setViewPassword(!viewPassword)}
                              type="button"
                              className="absolute right-1 top-1 h-9 w-9 p-0 hover:bg-muted rounded-full text-muted-foreground"
                              disabled={resetPasswordMutation.isPending}
                            >
                              {viewPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Confirm Password Field */}
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <Label
                            htmlFor="confirmPassword"
                            className="font-semibold"
                          >
                            Confirm Password
                          </Label>
                          <FormControl>
                            <Input
                              id="confirmPassword"
                              type={viewPassword ? "text" : "password"}
                              placeholder="••••••••"
                              disabled={resetPasswordMutation.isPending}
                              className="h-11 bg-background"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Password Requirements */}
                    <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-md space-y-1">
                      <p className="font-medium mb-1">Password requirements:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>At least 8 characters long</li>
                        <li>At least one uppercase letter (A-Z)</li>
                        <li>At least one lowercase letter (a-z)</li>
                        <li>At least one number (0-9)</li>
                        <li>At least one special character (!@#$%^&*)</li>
                      </ul>
                    </div>

                    {/* Error Display */}
                    {resetPasswordMutation.isError && (
                      <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 p-3 rounded-md flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 flex-shrink-0" />
                        {resetPasswordMutation.error instanceof Error
                          ? resetPasswordMutation.error.message
                          : "Failed to reset password. Please try again."}
                      </div>
                    )}

                    <Button
                      type="submit"
                      className="w-full h-11 rounded-full text-base font-medium mt-4 transition-all shadow-md hover:shadow-lg"
                      disabled={resetPasswordMutation.isPending}
                    >
                      {resetPasswordMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Resetting Password...
                        </>
                      ) : (
                        "Reset Password"
                      )}
                    </Button>

                    {/* Help Link */}
                    <p className="text-xs text-center text-muted-foreground mt-6">
                      Remember your password?{" "}
                      <Link
                        href="/login"
                        className="text-primary hover:underline font-medium"
                      >
                        Back to login
                      </Link>
                    </p>
                  </form>
                </Form>
              </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
