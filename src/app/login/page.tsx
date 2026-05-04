"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useActionState, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-background p-6 rounded shadow-md w-full max-w-sm border"
      >
        <div className="flex flex-col justify-center gap-2 flex-1">
          <label htmlFor="email">Email</label>
          <Input
            type="email"
            id="email"
            name="username"
            placeholder="Enter your email"
            required
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <label htmlFor="password">Password</label>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
            onChange={handleChange}
          />
        </div>

        {error && (
          <p className="text-sm text-red-500 mt-2">{error}</p>
        )}

        <Button className="p-2 w-full mt-4" disabled={isPending}>
          {isPending ? "Signing in..." : "Submit"}
        </Button>

        <div className="mt-4 text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Page;