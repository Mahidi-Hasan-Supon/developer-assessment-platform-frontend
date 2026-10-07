"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "@tanstack/react-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { useVerifyEmail } from "@/hook";
import { verifyEmailSchema } from "@/validation/auth.validation";

const VerifyEmailPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") ?? "";

  const { mutate: verifyEmail, isPending } = useVerifyEmail();

  const form = useForm({
    defaultValues: {
      email,
      otp: "",
    },

    validators: {
      onSubmit: verifyEmailSchema,
    },

    onSubmit: ({ value }) => {
      verifyEmail(value, {
        onSuccess: () => {
          router.push("/");
        },
      });
    },
  });

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Verify your email</h1>

          <p className="text-muted-foreground">
            We sent a 6-digit verification code to your email.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-5"
        >
          <form.Field name="email">
            {(field) => (
              <div className="space-y-2">
                <Label>Email</Label>

                <Input value={field.state.value} disabled type="email" />
              </div>
            )}
          </form.Field>

          <form.Field name="otp">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>OTP</Label>

                <Input
                  id={field.name}
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="Enter 6-digit OTP"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />

                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-destructive">
                    {field.state.meta.errors[0]?.message}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Verifying..." : "Verify email"}
          </Button>
        </form>
      </div>
    </main>
  );
};

export default VerifyEmailPage;
