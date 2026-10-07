"use client";

import { useForm } from "@tanstack/react-form";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

import { toast } from "../ui/toast";

import { useRegister } from "@/hook";
import { registerSchema } from "@/validation/auth.validation";
import type { RegisterPayload } from "@/types";
import GoogleLoginOAuth from "../modules/google-form/googleLogin";

interface RegisterFormProps {
  role: "CANDIDATE" | "COMPANY";
}

const RegisterForm = ({ role }: RegisterFormProps) => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { mutate: register, isPending: registerPending } = useRegister();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "CANDIDATE" as "CANDIDATE" | "COMPANY",
      confirmPassword: "",
    },

    validators: {
      onSubmit: registerSchema,
    },

    onSubmit: ({ value }) => {
      const registrationData: RegisterPayload = {
        name: value.name,
        email: value.email,
        password: value.password,
        role: value.role,
      };

      register(registrationData, {
        onSuccess: (res) => {
          if (!res.success) {
            toast.add({
              title: "Registration failed",
              description: "Something went wrong. Please try again.",
              type: "error",
            });
            return;
          }

          toast.add({
            title: "Registration Successful",
            description: "Please verify your email address.",
            type: "success",
          });

          const params = new URLSearchParams({
            email: registrationData.email,
          });

          router.push(`/register/verify-account?${params.toString()}`);
        },

        onError: (err) => {
          toast.add({
            title: "Registration failed",
            description:
              err.message || "Something went wrong. Please try again.",
            type: "error",
          });
        },
      });
    },
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Create an account</h1>

        <p className="text-sm text-muted-foreground">
          Create your Development Assessment Platform account
        </p>
      </div>

      {/* Register Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          {/* Name */}
          <form.Field name="name">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>

                  <Input
                    id={field.name}
                    name={field.name}
                    type="text"
                    placeholder="John Doe"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    autoComplete="name"
                  />

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Email */}
          <form.Field name="email">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>

                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    placeholder="you@example.com"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    autoComplete="email"
                  />

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Password */}
          <form.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>

                  <div className="relative">
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      className="pr-10"
                      autoComplete="new-password"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Confirm Password */}
          <form.Field name="confirmPassword">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>

                  <div className="relative">
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      className="pr-10"
                      autoComplete="new-password"
                    />

                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
          {/* role */}
          <form.Field name="role">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Account Type</FieldLabel>

                  <select
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) =>
                      field.handleChange(
                        e.target.value as "CANDIDATE" | "COMPANY",
                      )
                    }
                    aria-invalid={isInvalid}
                    className="border-input bg-background ring-offset-background focus:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
                  >
                    <option value="CANDIDATE">Candidate</option>
                    <option value="COMPANY">Company</option>
                  </select>

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Submit */}
          <Button disabled={registerPending} type="submit" className="w-full">
            {registerPending ? (
              <>
                <Spinner />
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </FieldGroup>
      </form>

      {/* Google Login */}
      <FieldSeparator>Or continue with</FieldSeparator>

      <GoogleLoginOAuth />

      {/* Login Link */}
      <div className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
