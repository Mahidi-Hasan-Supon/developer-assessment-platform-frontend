"use client";

import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

import { forgotPasswordSchema } from "@/validation/auth.validation";
import { useForgotPassword } from "@/hook";

const ForgotPasswordForm = () => {
  const router = useRouter();

  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const form = useForm({
    defaultValues: {
      email: "",
    },

    validators: {
      onSubmit: forgotPasswordSchema,
    },

    onSubmit: async ({ value }) => {
      forgotPassword(
        {
          email: value.email.trim().toLowerCase(),
        },
        {
          onSuccess: () => {
            toast.add({
              title: "OTP Sent",
              description: "A password reset OTP has been sent to your email.",
              type: "success",
            });

            router.push(
              `/login/reset-password?email=${encodeURIComponent(
                value.email.trim().toLowerCase(),
              )}`,
            );
          },

          onError: (err) => {
            toast.add({
              title: "Failed",
              description: err.message || "Unable to send password reset OTP.",
              type: "error",
            });
          },
        },
      );
    },
  });

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Forgot Password?</CardTitle>

        <CardDescription>
          Enter your email address and we will send you a password reset OTP.
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
          <form.Field name="email">
            {(field) => (
              <Field
                data-invalid={
                  field.state.meta.isTouched && !field.state.meta.isValid
                }
              >
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>

                <Input
                  id={field.name}
                  name={field.name}
                  type="email"
                  placeholder="you@example.com"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />

                {field.state.meta.isTouched && !field.state.meta.isValid && (
                  <FieldError
                    errors={field.state.meta.errors.map((error) => ({
                      message: error?.message ?? "Invalid email",
                    }))}
                  />
                )}
              </Field>
            )}
          </form.Field>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Sending OTP..." : "Send OTP"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ForgotPasswordForm;
