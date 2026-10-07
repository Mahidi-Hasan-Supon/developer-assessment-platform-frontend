"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { Eye, EyeClosed } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

import { resetPasswordSchema } from "@/validation/auth.validation";
import { useResetPassword, useResendForgotPasswordOtp } from "@/hook";

const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [show, setShow] = useState(false);
  const [resendTimer, setResendTimer] = useState(300);

  const email = searchParams.get("email") || "";

  const { mutate: resetPassword, isPending } = useResetPassword();

  const { mutate: resendForgotPasswordOtp, isPending: isResending } =
    useResendForgotPasswordOtp();

  // OTP countdown
  useEffect(() => {
    if (resendTimer <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [resendTimer]);

  // Format 300 -> 05:00
  const minutes = Math.floor(resendTimer / 60)
    .toString()
    .padStart(2, "0");

  const seconds = (resendTimer % 60).toString().padStart(2, "0");

  const form = useForm({
    defaultValues: {
      otp: "",
      newPassword: "",
      confirmPassword: "",
    },

    validators: {
      onSubmit: resetPasswordSchema,
    },

    onSubmit: async ({ value }) => {
      resetPassword(
        {
          email,
          otp: value.otp,
          newPassword: value.newPassword,
        },
        {
          onSuccess: () => {
            toast.add({
              title: "Password Reset Successful",
              description: "Your password has been changed successfully.",
              type: "success",
            });

            router.push("/login");
          },

          onError: (err) => {
            toast.add({
              title: "Reset failed",
              description:
                err.message || "Invalid or expired OTP. Please try again.",
              type: "error",
            });
          },
        },
      );
    },
  });

  // Resend OTP
  const handleResendOtp = () => {
    resendForgotPasswordOtp(
      {
        email,
      },
      {
        onSuccess: () => {
          form.setFieldValue("otp", "");

          setResendTimer(300);

          toast.add({
            title: "OTP Sent",
            description:
              "A new password reset OTP has been sent to your email.",
            type: "success",
          });
        },

        onError: (err) => {
          toast.add({
            title: "Resend failed",
            description:
              err.message || "Failed to resend OTP. Please try again.",
            type: "error",
          });
        },
      },
    );
  };

  if (!email) {
    return null;
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>

        <CardDescription>
          Enter the OTP sent to{" "}
          <span className="font-medium text-foreground">{email}</span> and
          create a new password.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-5"
        >
          {/* OTP */}
          <form.Field name="otp">
            {(field) => (
              <Field>
                <FieldLabel>Verification Code</FieldLabel>

                <InputOTP
                  maxLength={6}
                  value={field.state.value}
                  onChange={(value) => {
                    const onlyDigits = value.replace(/\D/g, "").slice(0, 6);

                    field.handleChange(onlyDigits);
                  }}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>

                {field.state.meta.isTouched && !field.state.meta.isValid && (
                  <FieldError
                    errors={field.state.meta.errors.map((error) => ({
                      message: error?.message ?? "Invalid OTP",
                    }))}
                  />
                )}
              </Field>
            )}
          </form.Field>

          {/* OTP Timer */}
          <div className="flex items-center justify-between text-sm">
            {resendTimer > 0 ? (
              <p className="text-muted-foreground">
                OTP expires in{" "}
                <span className="font-medium text-foreground">
                  {minutes}:{seconds}
                </span>
              </p>
            ) : (
              <p className="text-destructive">OTP has expired.</p>
            )}

            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={resendTimer > 0 || isResending}
              onClick={handleResendOtp}
            >
              {isResending ? "Sending..." : "Resend OTP"}
            </Button>
          </div>

          {/* New Password */}
          <form.Field name="newPassword">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>New Password</FieldLabel>

                <div className="relative">
                  <Input
                    id={field.name}
                    type={show ? "text" : "password"}
                    placeholder="Enter new password"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />

                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    onClick={() => setShow((prev) => !prev)}
                  >
                    {show ? <Eye /> : <EyeClosed />}
                  </button>
                </div>

                {field.state.meta.isTouched && !field.state.meta.isValid && (
                  <FieldError
                    errors={field.state.meta.errors.map((error) => ({
                      message: error?.message ?? "Invalid password",
                    }))}
                  />
                )}
              </Field>
            )}
          </form.Field>

          {/* Confirm Password */}
          <form.Field name="confirmPassword">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>

                <div className="relative">
                  <Input
                    id={field.name}
                    type={show ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />

                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    onClick={() => setShow((prev) => !prev)}
                  >
                    {show ? <Eye /> : <EyeClosed />}
                  </button>
                </div>

                {field.state.meta.isTouched && !field.state.meta.isValid && (
                  <FieldError
                    errors={field.state.meta.errors.map((error) => ({
                      message: error?.message ?? "Passwords do not match",
                    }))}
                  />
                )}
              </Field>
            )}
          </form.Field>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ResetPasswordForm;
