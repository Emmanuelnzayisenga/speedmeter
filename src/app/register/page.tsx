"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

function Page() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });
  const [pending, setPending] = useState(false);
  const[error,setError]= useState<string|null>(null)
  const router= useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setPending(true);

      const response = await axios.post("/api/auth/register", formData);
      if (response.status !== 200) {
         setError(response.data.error??"Registration failed. Please try again.")
        return;
      }

      // Auto-login after successful registration
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
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? "Registration failed.");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
    
      <form
        className="bg-background p-6 rounded shadow-md w-full max-w-sm border"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col justify-center gap-2 flex-1">
          <label htmlFor="username">Email</label>
          <Input
            onChange={handleChange}
            type="email"
            id="username"
            name="username"
            placeholder="Enter your email"
            autoComplete="off"
          />
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <label htmlFor="phoneNumber">Phone Number</label>
          <Input
            onChange={handleChange}
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Enter your phone number"
            autoComplete="off"
          />
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <label htmlFor="password">Password</label>
          <Input
            onChange={handleChange}
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            autoComplete="off"
          />
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <Input
            onChange={handleChange}
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your password"
            autoComplete="off"
          />
        </div>
       {error && (
          <p className="text-sm text-red-500 mt-2">{error}</p>
        )}
        

        <Button className="p-2 w-full mt-4" disabled={pending}>
          {pending ? <Loader2 className="animate-spin mr-2" /> : null}
          Submit
        </Button>

        <div className="mt-4 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Page;