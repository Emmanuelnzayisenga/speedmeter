"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthShell } from "@/components/auth/AuthShell";
import Link from "next/link";
import { useActionState, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

function Page() {
  const [error, setError] = useState<string | null>(null)
  const router= useRouter()
  const [isPending, setIsPending] = useState(false)
  const[formData, setFormData]= useState({
    username:"",
    password:""
  })
  const handleSubmit = async (e:any) => {
    e.preventDefault()
    try {
      setIsPending(true)
      const resp = await signIn("credentials", {
        "username":formData.username,
        "password":formData.password,
        redirect:false
      }, )
      console.log(resp)
      if(resp?.ok){
        router.push("/dashboard")
      }
      if(resp?.error){
        if(resp.status==401)
        setError("Invalid username or password")
      else{
        setError("Failed to login please try again later")
      }
      }

    } catch (error) {
      console.log(error)
      setError("Failed to sign in please try again Later")

    } finally {
      setIsPending(false)
    }
  }
  const handleChange=(e: any)=>{
    setFormData({...formData, [e.target.name]:e.target.value})
  }

  return (
    <AuthShell title="SIGN IN" subtitle="Fleet Monitor">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="username"
            placeholder="you@example.com"
            required
            onChange={handleChange}
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="/forgot-password" className="text-xs text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="••••••••"
            required
            onChange={handleChange}
          />
        </div>

        {error && (
          <p className="text-sm text-sw-danger">{error}</p>
        )}

        <Button className="w-full gap-2" disabled={isPending}>
          {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
          {isPending ? "Signing in…" : "Sign In"}
        </Button>

        <p className="text-center text-xs text-muted-foreground pt-1">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary hover:underline">
            Register
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}

export default Page;