"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthShell } from "@/components/auth/AuthShell";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const phoneInputStyle = {
  width: '100%',
  height: '2.5rem',
  backgroundColor: 'hsl(var(--secondary))',
  color: 'hsl(var(--foreground))',
  border: '1px solid hsl(var(--border))',
  borderRadius: '0.375rem',
}
const phoneButtonStyle = {
  backgroundColor: 'hsl(var(--secondary))',
  border: '1px solid hsl(var(--border))',
  borderRadius: '0.375rem 0 0 0.375rem',
}
const phoneDropdownStyle = {
  backgroundColor: 'hsl(var(--card))',
  color: 'hsl(var(--foreground))',
}
export const dynamic = "force-dynamic";

function Page(this: any) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

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
        setError(response.data.error ?? "Registration failed. Please try again.")
        return;
      }

      // Auto-login after successful registration
      const resp = await signIn("credentials", {
        "username": formData.username,
        "password": formData.password,
        redirect: false
      },)
      console.log(resp)
      if (resp?.ok) {
        router.push("/dashboard")
      }
      if (resp?.error) {
        if (resp.status == 401)
          setError("Invalid username or password")
        else {
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
    <AuthShell title="CREATE ACCOUNT" subtitle="Fleet Monitor">
      <form autoComplete="off" onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="username">Email</Label>
          <Input
            onChange={handleChange}
            type="email"
            id="username"
            name="username"
            placeholder="you@example.com"
            autoComplete="off"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <PhoneInput
            containerStyle={{ width: "100%" }}
            inputStyle={phoneInputStyle}
            buttonStyle={phoneButtonStyle}
            dropdownStyle={phoneDropdownStyle}
            enableTerritories
            enableSearch
            enableAreaCodes
            countryCodeEditable={false}
            enableLongNumbers
            inputProps={{
              name: 'phone',
              required: true,
              autoFocus: true
            }}
            country={'rw'}
            value={formData.phoneNumber}
            onChange={(phone) => setFormData({ ...formData, phoneNumber: phone })}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            onChange={handleChange}
            type="password"
            id="password"
            name="password"
            placeholder="••••••••"
            autoComplete="off"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            onChange={handleChange}
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="••••••••"
            autoComplete="off"
          />
        </div>

        {error && (
          <p className="text-sm text-sw-danger">{error}</p>
        )}

        <Button className="w-full gap-2" disabled={pending}>
          {pending && <Loader2 className="w-4 h-4 animate-spin" />}
          {pending ? "Creating account…" : "Create Account"}
        </Button>

        <p className="text-center text-xs text-muted-foreground pt-1">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}

export default Page;