"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

import { Button } from "@/components/ui/button";
import { REGEXP_ONLY_DIGITS } from "input-otp";

import { useResendVerificationOtp, useVerifyEmail } from "@/hook";
import { toast } from "@/components/ui/toast";

const RESEND_COOLDOWN = 120;

const VerifyAccountForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [resendTimer, setResendTimer] = useState(RESEND_COOLDOWN);

  const { mutate: verifyEmail, isPending } = useVerifyEmail();
  const { mutate: resendOtp, isPending: isResending } =
    useResendVerificationOtp();

  useEffect(() => {
    if (!email) {
      router.push("/register");
    }
  }, [email, router]);

  useEffect(() => {
    if (resendTimer <= 0) return;

    const timer = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendTimer]);

  const handleSubmit = () => {
    if (otp.length !== 6) {
      setIsInvalid(true);
      return;
    }

    verifyEmail(
      {
        email,
        otp,
      },
      {
        onSuccess: (res) => {
          if (!res.success) {
            toast.add({
              title: "Verification failed",
              description: "Something went wrong. Please try again.",
              type: "error",
            });

            return;
          }

          toast.add({
            title: "Verification Successful",
            description: "Your account has been verified successfully.",
            type: "success",
          });

          router.push("/");
        },

        onError: (err) => {
          setIsInvalid(true);

          toast.add({
            title: "Verification failed",
            description:
              err.message || "Invalid or expired OTP. Please try again.",
            type: "error",
          });
        },
      },
    );
  };

  if (!email) {
    return null;
  }

  const handleResendOtp = () => {
    resendOtp(
      { email },
      {
        onSuccess: () => {
          setOtp("");
          setIsInvalid(false);
          setResendTimer(120);

          toast.add({
            title: "OTP Sent",
            description: "A new verification code has been sent to your email.",
            type: "success",
          });
        },
        onError: (err) => {
          toast.add({
            title: "Resend failed",
            description: err.message || "Failed to resend verification code.",
            type: "error",
          });
        },
      },
    );
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Verify your account</CardTitle>

        <CardDescription>
          Enter the 6-digit OTP sent to{" "}
          <span className="font-medium text-foreground">{email}</span>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="form-otp"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleSubmit();
          }}
        >
          <Field data-invalid={isInvalid}>
            <FieldLabel htmlFor="otp">Verification Code</FieldLabel>

            <InputOTP
              id="otp"
              name="otp"
              maxLength={6}
              value={otp}
              pattern={REGEXP_ONLY_DIGITS}
              autoComplete="off"
              onChange={(value) => {
                const onlyDigits = value.replace(/\D/g, "").slice(0, 6);

                setOtp(onlyDigits);

                if (isInvalid) {
                  setIsInvalid(false);
                }
              }}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>

              <InputOTPSeparator />

              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>

            {isInvalid && (
              <FieldError
                errors={[
                  {
                    message: "Invalid or expired verification code.",
                  },
                ]}
              />
            )}

            <FieldDescription>
              {resendTimer > 0
                ? `Resend code in ${resendTimer}s`
                : "You can request a new code"}
            </FieldDescription>
          </Field>
        </form>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={handleResendOtp}
          disabled={resendTimer > 0}
        >
          {isResending ? "Sending..." : "Resend"}
        </Button>

        <Button type="submit" form="form-otp" disabled={isPending}>
          {isPending ? "Verifying..." : "Verify Account"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VerifyAccountForm;
