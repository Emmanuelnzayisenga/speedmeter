import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/lib/api/auth.api";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { logout } from "@/lib/redux/authSlice";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signIn, signOut } from "next-auth/react";
import { initiateOtpFlow, clearAuthFlow } from "@/lib/redux/authFlowSlice";

export function useLogin() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authApi.initLogin(email, password),
    onSuccess: (data) => {
      toast.success("Login initiated! Please check your email for OTP.");
      dispatch(
        initiateOtpFlow({
          identifier: data.user.email,
          flowType: "LOGIN_OTP",
        }),
      );
      router.push(
        `/verify-otp?email=${encodeURIComponent(data.user.email)}&type=LOGIN_OTP`,
      );
    },
    onError: (error: any) => {
      toast.error(error?.message || "Login failed. Please try again.");
    },
  });
}

export function useResendOtp() {
  return useMutation({
    mutationFn: authApi.resendOtp,
    onSuccess: (data) => {
      toast.success("OTP code sent successfully!");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to resend OTP. Please try again.");
    },
  });
}

// 2. Hook for Finalizing Login (Verify OTP)
export function useFinalizeLogin() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ email, otp }: { email: string; otp: string }) => {
      const result = await signIn("credentials", {
        email,
        otp,
        redirect: false,
      });

      if (result?.error) throw new Error(result.error);
      return result;
    },
    onSuccess: () => {
      dispatch(clearAuthFlow());
      router.push("/");
      toast.success("Login successful!");
    },
    onError: (error: any) => {
      toast.error(
        error?.message || "OTP verification failed. Please try again.",
      );
    },
  });
}

// 3. Hook for Registration
export function useRegister() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      toast.success("Registration successful! Please verify your email.");
      dispatch(
        initiateOtpFlow({
          identifier: data.user.email,
          flowType: "REGISTRATION",
        }),
      );
      router.push(
        `/verify-otp?email=${encodeURIComponent(data.user.email)}&type=REGISTRATION`,
      );
    },
    onError: (error: any) => {
      toast.error(error?.message || "Registration failed. Please try again.");
    },
  });
}

export function useVerifyResetPasswordToken() {
  const router = useRouter();
  return useMutation({
    mutationFn: authApi.verifyResetPasswordToken,
    onSuccess: (data) => {
      toast.success("Verification done successfully! redirecting ...");
      router.push(
        `/reset-password?token=${encodeURIComponent(data.token)}&email=${data.email}&type=PASSWORD_RESET`,
      );
    },
    onError: (error: any) => {
      toast.error(error?.message || "Verification failed. Please try again.");
    },
  });
}

export function useCheckVerifyResetPasswordToken() {
  const router = useRouter();
  return useMutation({
    mutationFn: authApi.checkVerifyResetPasswordToken,
    onSuccess: (data) => {
      toast.success("Verification done successfully!");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Verification failed. Please try again.");
      router.push("/forget-password");
    },
  });
}

export function useVerifyRegistration() {
  const router = useRouter();
  return useMutation({
    mutationFn: authApi.verifyRegistration,
    onSuccess: (data) => {
      toast.success("Email verified successfully! You can now log in.");
      if (data.token) {
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
    },
    onError: (error: any) => {
      toast.error(error?.message || "Verification failed. Please try again.");
    },
  });
}

export function useForgotPassword() {
  const router = useRouter();
  return useMutation({
    mutationFn: ({ email }: { email: string }) => authApi.forgetPassword(email),
    onSuccess: (data) => {
      toast.success(
        data.message || "Password reset email sent! Please check your inbox.",
      );
      router.push(
        `/verify-otp?email=${encodeURIComponent(data.email)}&type=PASSWORD_RESET`,
      );
    },
    onError: (error: any) => {
      toast.error(
        error?.message || "Failed to send reset email. Please try again.",
      );
    },
  });
}

export function useResetPassword() {
  const router = useRouter();

  return useMutation({
    mutationFn: (resetData: any) => authApi.resetPassword(resetData),
    onSuccess: (data) => {
      toast.success(
        data.message ||
          "Password reset successful! Please login with your new password.",
      );
      router.push("/login");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Password reset failed. Please try again.");
    },
  });
}

 

export function useLogout() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      dispatch(logout());
      queryClient.clear();
      signOut({ redirect: true, callbackUrl: "/login" });
    },
    onError: (error: any) => {
      toast.error(error?.message || "Logout failed");
    },
  });
}

export function useAuthStatus() {
  const token = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.user);

  return {
    isAuthenticated: !!token,
    user,
    token,
  };
}

export function useOtpFlow() {
  const dispatch = useAppDispatch();
  const otpFlow = useAppSelector((state) => state.authFlow);

  const clearFlow = () => {
    dispatch(clearAuthFlow());
  };

  return {
    ...otpFlow,
    clearFlow,
  };
}
