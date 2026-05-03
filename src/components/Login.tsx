"use client";

import { useState } from "react";
import { useLogin } from "@/hooks/useAuthHooks"; 
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginValues } from "@/lib/validations/auth.schema";
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
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";

export default function Login() {
  const [viewPassword, setViewPassword] = useState(false);
  
  const loginMutation = useLogin();

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 3. Form Submit Handler
  const onSubmit = (data: LoginValues) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="relative min-h-screen grid grid-cols-1 lg:grid-cols-3 w-full">
      
     
      {/* Illustration Section (Hidden on Mobile, takes 2/3 on Desktop) */}
      <div className="hidden lg:flex lg:col-span-2 items-center justify-center p-12 relative z-10 border-r border-border/50 bg-muted/10 backdrop-blur-sm">
        <div className="max-w-3xl w-full">
          <img 
            src="/svgs/secure-login.svg" 
            alt="Secure Login Illustration" 
            className="w-full h-auto drop-shadow-2xl transition-transform hover:scale-105 duration-700"
          />
        </div>
      </div>

      {/* Form Section (Centered, takes 1/3 on Desktop, full width on Mobile) */}
      <div className="flex flex-col items-center justify-center p-6 sm:p-12 relative z-10 w-full min-h-screen lg:min-h-full bg-background/50 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none">
        
        {/* Logo Placement */}
        <div className="mb-8 flex flex-col items-center">
          <img src="/logo.png" alt="OneCard Logo" className="h-12 w-auto mb-4" />
        </div>

        <Card className="w-full max-w-md shadow-xl border-border/50 bg-background/80 backdrop-blur-md">
          <CardHeader className="space-y-2 pb-6">
            <CardTitle className="text-3xl font-bold text-center tracking-tight">
              Welcome back
            </CardTitle>
            <CardDescription className="text-center text-base">
              Login to your All-in-One Secure Card access
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {/* 4. Wrap the form inside the Shadcn Form Provider */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                
                {/* Phone Number Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <Label htmlFor="email" className="font-semibold">Email Address</Label>
                      <FormControl>
                        <Input
                          id="email"
                          placeholder="e.g. user@example.com"
                          disabled={loginMutation.isPending}
                          className="h-11 bg-background"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password" className="font-semibold">Password</Label>
                        <Link href="/forget-password" className="text-sm font-medium text-primary hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <div className="relative">
                        <FormControl>
                          <Input
                            id="password"
                            type={viewPassword ? "text" : "password"}
                            disabled={loginMutation.isPending}
                            className="h-11 pr-10 bg-background"
                            placeholder="••••••••"
                            {...field}
                          />
                        </FormControl>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setViewPassword(!viewPassword)}
                          type="button"
                          className="absolute right-1 top-1 h-9 w-9 p-0 hover:bg-muted rounded-full text-muted-foreground"
                          disabled={loginMutation.isPending}
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

                {/* API Error Handling */}
                {loginMutation.isError && (
                  <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 p-3 rounded-md flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-destructive flex-shrink-0"></span>
                    {/* Extract error message gracefully */}
                    {loginMutation.error instanceof Error ? loginMutation.error.message : "An error occurred during login."}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full h-11 rounded-full text-base font-medium mt-2 transition-all shadow-md hover:shadow-lg"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Authenticating...
                    </>
                  ) : (
                    "Sign in securely"
                  )}
                </Button>

                <div className="text-center mt-4 text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link href="/register" className="text-primary font-medium hover:underline">
                    Sign up
                  </Link>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}