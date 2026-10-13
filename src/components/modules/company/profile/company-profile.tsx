"use client";

import { useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import {
  useMyCompanyProfile,
  useUpdateMyCompanyProfile,
} from "@/hook/company.hook";
import { profileSchema } from "@/validation";
import { toast } from "@/components/ui/toast";

export default function CompanyProfilePage() {
  const { data, isLoading, isError } = useMyCompanyProfile();
  const updateProfile = useUpdateMyCompanyProfile();

  const profile = data?.data;

  const form = useForm({
    defaultValues: {
      companyName: "",
      website: "",
      industry: "",
      location: "",
      contactNumber: "",
      description: "",
    },
    validators: {
      onSubmit: profileSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await updateProfile.mutateAsync({
          companyName: value.companyName,
          website: value.website,
          industry: value.industry,
          location: value.location,
          contactNumber: value.contactNumber,
          description: value.description,
        });

        toast.add({
          title: "Profile Updated",
          description: "Your company profile has been updated successfully.",
          type: "success",
        });
      } catch (error) {
        toast.add({
          title: "Update Failed",
          description:
            error instanceof Error
              ? error.message
              : "Failed to update company profile. Please try again.",
        });
      }
    },
  });

  useEffect(() => {
    if (!profile) return;

    form.reset({
      companyName: profile.companyName ?? "",
      website: profile.website ?? "",
      industry: profile.industry ?? "",
      location: profile.location ?? "",
      contactNumber: profile.contactNumber ?? "",
      description: profile.description ?? "",
    });
  }, [profile, form]);

  if (isLoading) {
    return (
      <p className="p-6 flex items-center justify-center my-50">
        Loading company profile...
      </p>
    );
  }

  if (isError || !profile) {
    return (
      <p className="p-6 text-destructive">
        Failed to load company profile. Please try again.
      </p>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Company Profile</h1>
        <p className="text-sm text-muted-foreground">
          Manage your company information.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
          <CardDescription>
            Update the details associated with your company.
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
            <form.Field name="companyName">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Company Name</Label>
                  <Input
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="Enter company name"
                  />
                  {field.state.meta.errors.map((error, index) => (
                    <p key={Number(index)} className="text-sm text-destructive">
                      {typeof error === "string" ? error : error?.message}
                    </p>
                  ))}
                </div>
              )}
            </form.Field>

            <form.Field name="website">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Website URL</Label>
                  <Input
                    id={field.name}
                    type="url"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="https://example.com"
                  />
                  {field.state.meta.errors.map((error, index) => (
                    <p key={Number(index)} className="text-sm text-destructive">
                      {typeof error === "string" ? error : error?.message}
                    </p>
                  ))}
                </div>
              )}
            </form.Field>

            <div className="grid gap-5 md:grid-cols-2">
              <form.Field name="industry">
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Industry</Label>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      placeholder="e.g. Software Development"
                    />
                  </div>
                )}
              </form.Field>

              <form.Field name="location">
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Location</Label>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      placeholder="e.g. Dhaka, Bangladesh"
                    />
                  </div>
                )}
              </form.Field>
            </div>

            <form.Field name="contactNumber">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Contact Number</Label>
                  <Input
                    id={field.name}
                    type="tel"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="Enter company contact number"
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="description">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Description</Label>
                  <Textarea
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="Tell us about your company"
                    rows={5}
                  />
                  <p className="text-xs text-muted-foreground">
                    {field.state.value.length}/1000 characters
                  </p>
                  {field.state.meta.errors.map((error, index) => (
                    <p key={Number(index)} className="text-sm text-destructive">
                      {typeof error === "string" ? error : error?.message}
                    </p>
                  ))}
                </div>
              )}
            </form.Field>

            <div className="flex justify-end">
              <Button type="submit" disabled={updateProfile.isPending}>
                {updateProfile.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>
            Your registered company account details.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-sm text-muted-foreground">Account Email</p>
            <p className="font-medium">{profile.user.email}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Application Status</p>
            <p className="font-medium">{profile.status}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
