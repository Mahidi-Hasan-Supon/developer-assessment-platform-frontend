import z from "zod";

export const companyApplicationSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be less than 1000 characters"),

  website: z
    .string()
    .regex(
      /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+.*$/,
      "Please provide a valid website URL",
    )
    .or(z.literal("")),

  location: z.string().min(2, "Location is required"),

  industry: z.string().min(2, "Industry is required"),
});

// contactNumber: z
//     .string()
//     .refine((val) => val === "" || /^(?:\+?880|0)1[3-9]\d{8}$/.test(val), {
//       message: "Please provide valid Bangladeshi number",
//     })
//     .optional(),
