"use client";

import { useState } from "react";
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
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { useRegister } from "@/hooks/useAuthHooks"; 
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterValues } from "@/lib/validations/auth.schema";

export default function Register() {
  const registerMutation = useRegister();

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    }
  });

  const [viewPassword, setViewPassword] = useState(false);
  const [viewConfirmPassword, setViewConfirmPassword] = useState(false);
  
  const onSubmit = (data: RegisterValues) => {
    registerMutation.mutate(data);
  };
  
  const isLoading = registerMutation.isPending;
 

  return (
    <div className="relative min-h-screen grid grid-cols-1 lg:grid-cols-3 w-full">
    
      {/* Form Section (Centered, takes 1/3 on Desktop, full width on Mobile) */}
      <div className="flex flex-col items-center justify-center p-6 sm:p-12 relative z-10 w-full min-h-screen lg:min-h-full order-2 lg:order-1 lg:col-span-1">
        
        {/* Logo Placement */}
        <div className="mb-6 flex flex-col items-center">
          <img src="/logo.png" alt="OneCard Logo" className="h-10 w-auto mb-2" />
        </div>

        <Card className="w-full max-w-md shadow-xl border-border/50 bg-background/80 backdrop-blur-md">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl font-bold text-center tracking-tight">
              Create an account
            </CardTitle>
            <CardDescription className="text-center text-sm">
              Join OneCard to unify your financial world.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                
                {/* Name Fields (Side by Side) */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <Label htmlFor="firstName" className="font-semibold text-sm">First Name</Label>
                        <FormControl>
                          <Input
                            id="firstName"
                            placeholder="John"
                            {...field}
                            disabled={isLoading}
                            className="h-10 bg-background"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <Label htmlFor="lastName" className="font-semibold text-sm">
                          Last Name <span className="text-muted-foreground font-normal">(Optional)</span>
                        </Label>
                        <FormControl>
                          <Input
                            id="lastName"
                            placeholder="Doe"
                            {...field}
                            disabled={isLoading}
                            className="h-10 bg-background"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="email" className="font-semibold text-sm">Email Address</Label>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          {...field}
                          disabled={isLoading}
                          className="h-10 bg-background"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone Number */}
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="phoneNumber" className="font-semibold text-sm">Phone Number</Label>
                      <FormControl>
                        <Input
                          id="phoneNumber"
                          type="tel"
                          placeholder="e.g. 0780000000"
                          {...field}
                          disabled={isLoading}
                          className="h-10 bg-background"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="password" className="font-semibold text-sm">Password</Label>
                      <FormControl>
                        <div className="relative">
                          <Input
                            id="password"
                            type={viewPassword ? "text" : "password"}
                            placeholder="••••••••"
                            {...field}
                            disabled={isLoading}
                            className="h-10 pr-10 bg-background"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setViewPassword(!viewPassword)}
                            type="button"
                            className="absolute right-1 top-1 h-8 w-8 p-0 hover:bg-muted rounded-full text-muted-foreground"
                            disabled={isLoading}
                          >
                            {viewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Confirm Password */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="confirmPassword" className="font-semibold text-sm">Confirm Password</Label>
                      <FormControl>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={viewConfirmPassword ? "text" : "password"}
                            placeholder="••••••••"
                            {...field}
                            disabled={isLoading}
                            className="h-10 pr-10 bg-background"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setViewConfirmPassword(!viewConfirmPassword)}
                            type="button"
                            className="absolute right-1 top-1 h-8 w-8 p-0 hover:bg-muted rounded-full text-muted-foreground"
                            disabled={isLoading}
                          >
                            {viewConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-11 rounded-full text-base font-medium mt-4 transition-all shadow-md hover:shadow-lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    "Sign up securely"
                  )}
                </Button>
                
                {/* Link to Login */}
                <div className="text-center mt-4 text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link href="/login" className="text-primary font-medium hover:underline">
                    Sign in
                  </Link>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      {/* Illustration Section (Hidden on Mobile, takes 2/3 on Desktop) */}
      <div className="hidden lg:flex lg:col-span-2 items-center justify-center p-12 relative z-10 border-l border-border/50 bg-muted/10 backdrop-blur-sm order-1 lg:order-2">
        <div className="max-w-3xl w-full flex flex-col items-center">
          <img 
            src="/svgs/secure-signup.svg" 
            alt="Secure Sign Up Illustration" 
            className="w-full h-auto max-w-lg drop-shadow-2xl transition-transform hover:scale-105 duration-700 mb-8"
          />
          <h2 className="text-3xl font-bold text-foreground mb-4">One card to rule them all.</h2>
          <ul className="space-y-3 text-muted-foreground text-lg">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              Link unlimited bank accounts & crypto wallets
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              Zero foreign transaction fees globally
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              Generate instant virtual cards for safe online shopping
            </li>
          </ul>
        </div>
      </div>

    </div>
  );
}