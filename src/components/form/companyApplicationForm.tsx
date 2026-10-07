"use client";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useCreateCompanyApplication } from "@/hook/company.hook";
import { companyApplicationSchema } from "@/validation";
import { toast } from "../ui/toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function CompanyApplicationForm() {
  const router = useRouter();
  const { mutate, isPending } = useCreateCompanyApplication();

  const form = useForm({
    defaultValues: {
      // companyName: "",
      // description:
      //   "",
      // website: "",
      // location: "",
      // industry: "",
      companyName: "Tech Company LLC",
      description:
        "This is a dummy description with more than 10 characters for testing.",
      website: "https://deta.space",
      location: "Dhaka, Bangladesh",
      industry: "Software",
    },
    validators: {
      onSubmit: companyApplicationSchema,
    },
    onSubmit: async ({ value }) => {
      mutate(value, {
        onSuccess: () => {
          toast.add({
            title: "Application Submitted",
            description:
              "Your company application has been submitted successfully.Plz wait for admin Approve",
            type: "success",
          });
          router.push("/");
        },
        onError: (error) => {
          toast.add({
            title: "Application Failed",
            description:
              error.message || "Failed to submit company application.",
            type: "error",
          });
        },
      });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Company Name */}
        <form.Field name="companyName">
          {(field) => {
            // এরর ট্র্যাকিং লজিক ফিক্স করা হয়েছে
            const hasError =
              field.state.meta.errors && field.state.meta.errors.length > 0;
            return (
              <Field data-invalid={hasError}>
                <FieldLabel htmlFor={field.name}>Company Name</FieldLabel>
                <Input
                  id={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter company name"
                />
                {hasError && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        {/* Industry */}
        <form.Field name="industry">
          {(field) => {
            const hasError =
              field.state.meta.errors && field.state.meta.errors.length > 0;
            return (
              <Field data-invalid={hasError}>
                <FieldLabel htmlFor={field.name}>Industry</FieldLabel>
                <Select
                  value={field.state.value}
                  onValueChange={(val) => field.handleChange(val || "")}
                >
                  <SelectTrigger className="w-full" onBlur={field.handleBlur}>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Software">Software</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>

                {field.state.value === "Other" && (
                  <Input
                    className="mt-2"
                    placeholder="Enter your industry"
                    onChange={(e) => field.handleChange(e.target.value || "")}
                    onBlur={field.handleBlur}
                  />
                )}
                {hasError && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        {/* Website */}
        <form.Field name="website">
          {(field) => {
            const hasError =
              field.state.meta.errors && field.state.meta.errors.length > 0;
            return (
              <Field data-invalid={hasError}>
                <FieldLabel htmlFor={field.name}>Website</FieldLabel>
                <Input
                  id={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="https://yourcompany.com"
                />
                {hasError && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        {/* Location */}
        <form.Field name="location">
          {(field) => {
            const hasError =
              field.state.meta.errors && field.state.meta.errors.length > 0;
            return (
              <Field data-invalid={hasError}>
                <FieldLabel htmlFor={field.name}>Location</FieldLabel>
                <Input
                  id={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Dhaka, Bangladesh"
                />
                {hasError && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        {/* Description */}
        <form.Field name="description">
          {(field) => {
            const hasError =
              field.state.meta.errors && field.state.meta.errors.length > 0;
            return (
              <Field className="md:col-span-2" data-invalid={hasError}>
                <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                <Textarea
                  id={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Tell us about your company (Min 10 characters)"
                  rows={5}
                />
                {hasError && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
      </div>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  );
}
