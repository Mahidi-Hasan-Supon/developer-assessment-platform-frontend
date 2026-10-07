import z from "zod";
export const loginSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, "Password Must Minimum 8 Characters Long.")
    .regex(/[a-z]/, "Password must contain at least 1 Lowercase Letter")
    .regex(/[A-Z]/, "Password must contain at least 1 Uppercase Letter")
    .regex(/[0-9]/, "Password must contain at least 1 Number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least 1 Special Character",
    ),
});



export const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters long")
      .max(50, "Name must be less than 50 characters"),

    email: z
      .string()
      .email("Please provide a valid email address"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /[a-z]/,
        "Password must contain at least 1 lowercase letter",
      )
      .regex(
        /[A-Z]/,
        "Password must contain at least 1 uppercase letter",
      )
      .regex(
        /[0-9]/,
        "Password must contain at least 1 number",
      )
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least 1 special character",
      ),

    confirmPassword: z
      .string()
      .min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });


export const verifyEmailSchema = z.object({
  email: z.string().email("Enter a valid email"),
  otp: z
    .string()
    .length(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
});
