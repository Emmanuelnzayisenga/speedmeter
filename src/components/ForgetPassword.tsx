"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GridBackground from "../ui/GridBackground";
import { Mail } from "lucide-react";
import { forgetPasswordSchema, ForgetPasswordValues } from "@/lib/validations/auth.schema";
import { useForgotPassword } from "@/hooks/useAuthHooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
export default function ForgotPassword() {

const forgetPasswordMutation= useForgotPassword()
const form= useForm<ForgetPasswordValues>({
  resolver:zodResolver(forgetPasswordSchema),
  defaultValues:{
    email:""
  }
})
  

const onSubmit= (data:ForgetPasswordValues)=>{
  forgetPasswordMutation.mutate(data)
}
  return (
    <div className="relative min-h-screen grid grid-cols-1 lg:grid-cols-3 w-full">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <GridBackground />
      
      </div>

      {/* Form Section */}
      <div className="flex flex-col items-center justify-center p-6 sm:p-12 relative z-10 w-full min-h-screen lg:min-h-full col-span-1 lg:col-span-1">
        <div className="mb-8 flex flex-col items-center">
          <img
            src="/logo.png"
            alt="OneCard Logo"
            className="h-10 w-auto mb-2"
          />
        </div>

        <Card className="w-full max-w-md shadow-xl border-border/50 bg-background/80 backdrop-blur-md relative overflow-hidden">
           <div className="animate-in fade-in slide-in-from-right-4 duration-500 relative">
     

      <CardHeader className="space-y-2 pb-6 pt-10">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
          <Mail className="w-6 h-6 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold text-center tracking-tight">Forgot Password?</CardTitle>
        <CardDescription className="text-center text-sm px-4">
          Enter the phone number or email associated with your OneCard account.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                          disabled={forgetPasswordMutation.isPending}
                          className="h-11 bg-background"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
            />
          
          
          
          
          <Button type="submit" className="w-full h-11 rounded-full text-base font-medium mt-2 shadow-md" disabled={forgetPasswordMutation.isPending}>
            {forgetPasswordMutation.isPending? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...</> : "Send Reset Code"}
          </Button>
          </form>
        </Form>
      </CardContent>
    </div>
 

           
        </Card>
      </div>

      {/* Illustration Section */}
      <div className="hidden lg:flex lg:col-span-2 items-center justify-center p-12 relative z-10 border-l border-border/50 bg-muted/10 backdrop-blur-sm">
        <div className="max-w-3xl w-full flex flex-col items-center">
          <img
            src="/svgs/forgot-password.svg"
            alt="Security Illustration"
            className="w-full h-auto max-w-lg drop-shadow-2xl transition-transform hover:scale-105 duration-700 mb-8"
          />
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Advanced Security.
          </h2>
          <p className="text-muted-foreground text-lg text-center max-w-md">
            Your OneCard account is protected by bank-level AES-256 encryption.
            We never store your passwords in plain text.
          </p>
        </div>
      </div>
    </div>
  );
}
