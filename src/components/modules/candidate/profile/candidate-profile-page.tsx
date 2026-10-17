
"use client";

import { useEffect } from "react";
import { useForm } from "@tanstack/react-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";


import { z } from "zod";
import { useMyCandidateProfile, useUpdateMyCandidateProfile } from "@/hook";



const candidateProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters"),
});

export default function CandidateProfilePage() {
  const { data, isLoading, isError } = useMyCandidateProfile();
  const updateProfile = useUpdateMyCandidateProfile();

  const profile = data?.data;

  const form = useForm({
    defaultValues: {
      name: "",
    },
    validators: {
      onSubmit: candidateProfileSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await updateProfile.mutateAsync({
          name: value.name.trim(),
        });

        toast.add({
          title: "Profile Updated",
          description: "Your profile has been updated successfully.",
          type: "success",
        });
      } catch (error) {
        toast.add({
          title: "Update Failed",
          description:
            error instanceof Error
              ? error.message
              : "Failed to update your profile. Please try again.",
        });
      }
    },
  });

  useEffect(() => {
    if (!profile) return;

    form.reset({
      name: profile.name ?? "",
    });
  }, [profile, form]);

  if (isLoading) {
    return (
      <p className="my-50 flex items-center justify-center p-6">
        Loading profile...
      </p>
    );
  }

  if (isError || !profile) {
    return (
      <p className="p-6 text-destructive">
        Failed to load profile. Please try again.
      </p>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          My Profile
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage your personal account information.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Update the name associated with your account.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();
              void form.handleSubmit();
            }}
            className="space-y-5"
          >
            <form.Field name="name">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Full Name</Label>
                  <Input
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) =>
                      field.handleChange(event.target.value)
                    }
                    placeholder="Enter your full name"
                  />

                  {field.state.meta.errors.map((error, index) => (
                    <p
                      key={Number(index)}
                      className="text-sm text-destructive"
                    >
                      {typeof error === "string"
                        ? error
                        : error?.message}
                    </p>
                  ))}
                </div>
              )}
            </form.Field>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={updateProfile.isPending}
              >
                {updateProfile.isPending
                  ? "Saving..."
                  : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>
            Your registered account details.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">
              Email Address
            </p>
            <p className="font-medium">{profile.email}</p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">
              Account Role
            </p>
            <p className="font-medium">{profile.role}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

