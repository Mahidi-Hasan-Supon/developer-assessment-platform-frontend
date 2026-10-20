// "use client";
// import { useForm } from "@tanstack/react-form";
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";

// import { useState } from "react";
// import { Eye, EyeClosed } from "lucide-react";
// import { useRouter } from "next/navigation";

// import Link from "next/link";
// import { useLogin } from "@/hook";
// import {
//   Field,
//   FieldError,
//   FieldGroup,
//   FieldLabel,
//   FieldSeparator,
// } from "../ui/field";
// import { toast } from "../ui/toast";
// import { Spinner } from "../ui/spinner";
// import { loginSchema } from "@/validation";
// import GoogleLoginOAuth from "../modules/google-form/googleLogin";

// export default function LoginForm() {
//   const router = useRouter();
//   const [showPassword, setShowPassword] = useState(false);
//   const { mutate: login, isPending: loginPending } = useLogin();

//   const form = useForm({
//     defaultValues: {
//       // email: "mahidimahidihassansupon@gmail.com",
//       // password: "Aa@12345",
//       email: "admin@gmail.com",
//       password: "Admin@12345",
//     },
//     validators: {
//       onSubmit: loginSchema,
//     },
//     onSubmit: ({ value }) => {
//       console.log(value);
//       const loginData = {
//         email: value.email,
//         password: value.password,
//       };
//       login(loginData, {
//         onSuccess: (res) => {
//           // console.log(res);
//           toast.add({
//             title: "Login successfully",
//             description: "Welcome back",
//             type: "success",
//           });
//           router.push("/");
//         },
//         onError: (err) => {
//           // console.log(err);
//           toast.add({
//             title: "Authorization error",
//             description: err.message || "Someting went wrong.Please try again",
//             type: "error",
//           });
//         },
//       });
//     },
//   });

//   return (
//     <div className="flex flex-col gap-5">
//       <div className="flex flex-col items-center gap-2 text-center">
//         <h1 className="text-2xl font-bold tracking-tight">
//           Login to your account
//         </h1>
//         <p className="text-balance text-sm text-muted-foreground">
//           Enter your email below to login to your account
//         </p>
//       </div>

//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           form.handleSubmit();
//         }}
//       >
//         <FieldGroup>
//           <form.Field name="email">
//             {(field) => {
//               const isInvalid =
//                 field.state.meta.isTouched && !field.state.meta.isValid;

//               return (
//                 <Field data-invalid={isInvalid}>
//                   <FieldLabel htmlFor={field.name}>Email</FieldLabel>
//                   <Input
//                     id={field.name}
//                     name={field.name}
//                     onChange={(e) => field.handleChange(e.target.value)}
//                     onBlur={field.handleBlur}
//                     value={field.state.value}
//                     autoComplete="off"
//                     aria-invalid={isInvalid}
//                   />
//                   {isInvalid && <FieldError errors={field.state.meta.errors} />}
//                 </Field>
//               );
//             }}
//           </form.Field>

//           <form.Field name="password">
//             {(field) => {
//               const isInvalid =
//                 field.state.meta.isTouched && !field.state.meta.isValid;

//               return (
//                 <Field data-invalid={isInvalid}>
//                   <FieldLabel htmlFor={field.name}>Password</FieldLabel>
//                   <div className="relative">
//                     <Input
//                       id={field.name}
//                       name={field.name}
//                       type={showPassword ? "text" : "password"}
//                       onChange={(e) => field.handleChange(e.target.value)}
//                       onBlur={field.handleBlur}
//                       value={field.state.value}
//                       autoComplete="off"
//                       aria-invalid={isInvalid}
//                     />
//                     <button
//                       className="absolute right-3 top-1/2 -translate-y-1/2"
//                       type="button"
//                       onClick={() => setShowPassword((prev) => !prev)}
//                     >
//                       {showPassword ? (
//                         <EyeClosed className="size-4" />
//                       ) : (
//                         <Eye className="size-4" />
//                       )}
//                     </button>
//                   </div>
//                   <div className="flex justify-end">
//                     <Link
//                       href="/login/forgot-password"
//                       className="text-sm text-primary hover:underline"
//                     >
//                       Forgot password?
//                     </Link>
//                   </div>
//                   {isInvalid && <FieldError errors={field.state.meta.errors} />}
//                 </Field>
//               );
//             }}
//           </form.Field>

//           <Button disabled={loginPending} type="submit">
//             {loginPending ? (
//               <>
//                 <Spinner />
//                 LoggedIn
//               </>
//             ) : (
//               "Login"
//             )}
//           </Button>
//         </FieldGroup>
//       </form>
//       <FieldSeparator>Or</FieldSeparator>

//       {/* <GoogleLoginO /> */}
//       <GoogleLoginOAuth />

//       <div>
//         Don't have a account? Plz{" "}
//         <Link
//           href={"/register"}
//           className="text-primary hover:text-primary border-b"
//         >
//           Register
//         </Link>{" "}
//       </div>
//     </div>
//   );
// }

// new login form use demo credentials

// "use client";
// import { useForm } from "@tanstack/react-form";
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";

// import { useState } from "react";
// import { Eye, EyeClosed, Shield, Building2, User } from "lucide-react";
// import { useRouter } from "next/navigation";

// import Link from "next/link";
// import { useLogin } from "@/hook";
// import {
//   Field,
//   FieldError,
//   FieldGroup,
//   FieldLabel,
//   FieldSeparator,
// } from "../ui/field";
// import { toast } from "../ui/toast";
// import { Spinner } from "../ui/spinner";
// import { loginSchema } from "@/validation";
// import GoogleLoginOAuth from "../modules/google-form/googleLogin";

// export default function LoginForm() {
//   const router = useRouter();
//   const [showPassword, setShowPassword] = useState(false);
//   const { mutate: login, isPending: loginPending } = useLogin();

//   const form = useForm({
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//     validators: {
//       onSubmit: loginSchema,
//     },
//     onSubmit: ({ value }) => {
//       const loginData = {
//         email: value.email,
//         password: value.password,
//       };

//       login(loginData, {
//         onSuccess: (res) => {
//           toast.add({
//             title: "Login successful",
//             description: "Welcome back!",
//             type: "success",
//           });
//           router.push("/");
//         },
//         onError: (err: any) => {
//           // Backend theke asha full message ba error string
//           const backendMessage =
//             err?.response?.data?.message ||
//             err?.message ||
//             JSON.stringify(err) ||
//             "";
//           const status = err?.response?.status;

//           let title = "Login Failed";
//           let description = "Something went wrong. Please try again.";

//           const lowerCaseMsg = backendMessage.toLowerCase();

//           // Jodi 401 Unauthorized ba credentials/password related kichu thake
//           if (
//             status === 401 ||
//             lowerCaseMsg.includes("401") ||
//             lowerCaseMsg.includes("unauthorized") ||
//             lowerCaseMsg.includes("password") ||
//             lowerCaseMsg.includes("credential")
//           ) {
//             title = "Incorrect Password or Email";
//             description =
//               "Incorrect email or password. Plz try again.";
//           } else if (
//             lowerCaseMsg.includes("email") ||
//             lowerCaseMsg.includes("user not found") ||
//             lowerCaseMsg.includes("no account")
//           ) {
//             title = "Email Not Found";
//             description = "The email address you entered does not exist.";
//           } else if (backendMessage && !backendMessage.includes("http://")) {
//             description = backendMessage;
//           }

//           toast.add({
//             title: title,
//             description: description,
//             type: "error",
//           });
//         },
//       });
//     },
//   });

//   const handleDemoLogin = (email: string, pass: string) => {
//     form.setFieldValue("email", email);
//     form.setFieldValue("password", pass);
//   };

//   return (
//     <div className="flex flex-col gap-5">
//       <div className="flex flex-col items-center gap-2 text-center">
//         <h1 className="text-2xl font-bold tracking-tight">
//           Login to your account
//         </h1>
//         <p className="text-balance text-sm text-muted-foreground">
//           Enter your email below to login to your account
//         </p>
//       </div>

//       {/* Demo Accounts */}
//       <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
//         <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
//           <span>Demo Accounts</span>
//         </div>
//         <div className="grid grid-cols-3 gap-2">
//           <Button
//             type="button"
//             variant="outline"
//             size="sm"
//             onClick={() => handleDemoLogin("admin@gmail.com", "Admin@12345")}
//             className="flex items-center gap-1.5"
//           >
//             <Shield className="size-4" />
//             Admin
//           </Button>
//           <Button
//             type="button"
//             variant="outline"
//             size="sm"
//             onClick={() =>
//               handleDemoLogin("company@gmail.com", "Company@12345")
//             }
//             className="flex items-center gap-1.5"
//           >
//             <Building2 className="size-4" />
//             Company
//           </Button>
//           <Button
//             type="button"
//             variant="outline"
//             size="sm"
//             onClick={() =>
//               handleDemoLogin("customer@gmail.com", "Customer@12345")
//             }
//             className="flex items-center gap-1.5"
//           >
//             <User className="size-4" />
//             Customer
//           </Button>
//         </div>
//         <div className="mt-3 flex justify-between text-[11px] text-muted-foreground">
//           <span>Click to fill credentials</span>
//           <span>Click Login to proceed</span>
//         </div>
//       </div>

//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           form.handleSubmit();
//         }}
//       >
//         <FieldGroup>
//           <form.Field name="email">
//             {(field) => {
//               const isInvalid =
//                 field.state.meta.isTouched && !field.state.meta.isValid;

//               return (
//                 <Field data-invalid={isInvalid}>
//                   <FieldLabel htmlFor={field.name}>Email</FieldLabel>
//                   <Input
//                     id={field.name}
//                     name={field.name}
//                     onChange={(e) => field.handleChange(e.target.value)}
//                     onBlur={field.handleBlur}
//                     value={field.state.value}
//                     autoComplete="off"
//                     aria-invalid={isInvalid}
//                   />
//                   {isInvalid && <FieldError errors={field.state.meta.errors} />}
//                 </Field>
//               );
//             }}
//           </form.Field>

//           <form.Field name="password">
//             {(field) => {
//               const isInvalid =
//                 field.state.meta.isTouched && !field.state.meta.isValid;

//               return (
//                 <Field data-invalid={isInvalid}>
//                   <FieldLabel htmlFor={field.name}>Password</FieldLabel>
//                   <div className="relative">
//                     <Input
//                       id={field.name}
//                       name={field.name}
//                       type={showPassword ? "text" : "password"}
//                       onChange={(e) => field.handleChange(e.target.value)}
//                       onBlur={field.handleBlur}
//                       value={field.state.value}
//                       autoComplete="off"
//                       aria-invalid={isInvalid}
//                     />
//                     <button
//                       className="absolute right-3 top-1/2 -translate-y-1/2"
//                       type="button"
//                       onClick={() => setShowPassword((prev) => !prev)}
//                     >
//                       {showPassword ? (
//                         <EyeClosed className="size-4" />
//                       ) : (
//                         <Eye className="size-4" />
//                       )}
//                     </button>
//                   </div>
//                   <div className="flex justify-end">
//                     <Link
//                       href="/login/forgot-password"
//                       className="text-sm text-primary hover:underline"
//                     >
//                       Forgot password?
//                     </Link>
//                   </div>
//                   {isInvalid && <FieldError errors={field.state.meta.errors} />}
//                 </Field>
//               );
//             }}
//           </form.Field>

//           <Button disabled={loginPending} type="submit">
//             {loginPending ? (
//               <>
//                 <Spinner />
//                 LoggedIn
//               </>
//             ) : (
//               "Login"
//             )}
//           </Button>
//         </FieldGroup>
//       </form>

//       <FieldSeparator>Or</FieldSeparator>

//       <GoogleLoginOAuth />

//       <div>
//         Don't have an account? Plz{" "}
//         <Link
//           href={"/register"}
//           className="text-primary hover:text-primary border-b"
//         >
//           Register
//         </Link>{" "}
//       </div>
//     </div>
//   );
// }

// new login form

"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  ShieldCheck,
  Building2,
  UserRound,
  Mail,
  LockKeyhole,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "../ui/field";
import { Spinner } from "../ui/spinner";
import { toast } from "../ui/toast";

import { useLogin } from "@/hook";
import { loginSchema } from "@/validation";
import GoogleLoginOAuth from "../modules/google-form/googleLogin";

const DEMO_ACCOUNTS = [
  {
    label: "Admin",
    email: "admin@gmail.com",
    password: "Admin@12345",
    icon: ShieldCheck,
    style:
      "border-blue-500/25 bg-blue-500/5 hover:border-blue-500/50 hover:bg-blue-500/10",
    iconStyle: "bg-blue-500/10 text-blue-500",
  },
  {
    label: "Company",
    email: "Company@gmail.com",
    password: "Company@12345",
    icon: Building2,
    style:
      "border-violet-500/25 bg-violet-500/5 hover:border-violet-500/50 hover:bg-violet-500/10",
    iconStyle: "bg-violet-500/10 text-violet-500",
  },
  {
    label: "Candidate",
    email: "Candidate@gmail.com",
    password: "Candidate@12345",
    icon: UserRound,
    style:
      "border-emerald-500/25 bg-emerald-500/5 hover:border-emerald-500/50 hover:bg-emerald-500/10",
    iconStyle: "bg-emerald-500/10 text-emerald-500",
  },
];

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isPending: loginPending } = useLogin();

  const form = useForm({
    defaultValues: {
      email: "mahidimahidihasansupon+20@gmail.com",
      password: "@User123456",
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: ({ value }) => {
      login(
        {
          email: value.email.trim(),
          password: value.password,
        },
        {
          onSuccess: (res) => {
            toast.add({
              title: "Login successful",
              description: "Welcome back to DevAssess!",
              type: "success",
            });

            // router.push("/");
            window.location.href = "/";
          },
          onError: (err: any) => {
            const message =
              err?.response?.data?.message ||
              err?.data?.message ||
              err?.message ||
              "";

            const normalizedMessage = String(message).toLowerCase();
            const status = err?.response?.status ?? err?.status;

            let title = "Login failed";
            let description = "Something went wrong. Please try again.";

            if (
              status === 401 ||
              normalizedMessage.includes("unauthorized") ||
              normalizedMessage.includes("invalid credential") ||
              normalizedMessage.includes("incorrect password")
            ) {
              title = "Invalid credentials";
              description = "Please check your email and password.";
            } else if (
              normalizedMessage.includes("verify") ||
              normalizedMessage.includes("unverified")
            ) {
              title = "Email verification required";
              description = String(message);
            } else if (
              normalizedMessage.includes("blocked") ||
              normalizedMessage.includes("suspended")
            ) {
              title = "Account unavailable";
              description = String(message);
            } else if (message) {
              description = String(message);
            }

            toast.add({
              title,
              description,
              type: "error",
            });
          },
        },
      );
    },
  });

  const handleDemoLogin = (email: string, password: string) => {
    form.setFieldValue("email", email);
    form.setFieldValue("password", password);
  };

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div className="space-y-2">
        <div className="mb-4 mx-25 inline-flex size-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
          <LockKeyhole className="size-5" />
        </div>

        <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>

        <p className="text-sm leading-6 text-muted-foreground">
          Sign in to continue to your DevAssess account.
        </p>
      </div>

      {/* Demo accounts */}
      <div className="rounded-2xl border border-border bg-muted/30 p-4">
        <div className="mb-3 flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Sparkles className="size-4" />
          </span>

          <div>
            <h2 className="text-sm font-semibold">Try a demo account</h2>
            <p className="text-xs text-muted-foreground">
              Select a role to fill the login fields.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {DEMO_ACCOUNTS.map((account) => {
            const Icon = account.icon;

            return (
              <button
                key={account.label}
                type="button"
                disabled={loginPending}
                onClick={() => handleDemoLogin(account.email, account.password)}
                className={`flex min-w-0 flex-col items-center gap-2 rounded-xl border p-3 text-center transition-all duration-200 hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-50 ${account.style}`}
              >
                <span
                  className={`flex size-9 items-center justify-center rounded-xl ${account.iconStyle}`}
                >
                  <Icon className="size-4" />
                </span>

                <span className="text-xs font-semibold">{account.label}</span>
              </button>
            );
          })}
        </div>

        <p className="mt-3 text-center text-xs text-muted-foreground">
          Demo credentials are filled in automatically. Click Login to continue.
        </p>
      </div>

      {/* Login form */}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          void form.handleSubmit();
        }}
        className="space-y-5"
      >
        <FieldGroup>
          <form.Field name="email">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid} className="gap-2">
                  <FieldLabel htmlFor={field.name}>Email address</FieldLabel>

                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      spellCheck={false}
                      value={field.state.value}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      onBlur={field.handleBlur}
                      aria-invalid={isInvalid}
                      disabled={loginPending}
                      className="h-11 rounded-xl pl-10"
                    />
                  </div>

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid} className="gap-2">
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>

                  <div className="relative">
                    <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id={field.name}
                      name={field.name}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      value={field.state.value}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      onBlur={field.handleBlur}
                      aria-invalid={isInvalid}
                      disabled={loginPending}
                      className="h-11 rounded-xl pl-10 pr-11"
                    />

                    <button
                      type="button"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      onClick={() => setShowPassword((previous) => !previous)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
        </FieldGroup>

        <div className="-mt-2 flex justify-end">
          <Link
            href="/login/forgot-password"
            className="text-sm font-medium text-primary underline-offset-4 transition-colors hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          disabled={loginPending}
          className="h-11 w-full rounded-xl font-semibold shadow-sm transition-transform hover:-translate-y-0.5"
        >
          {loginPending ? (
            <>
              <Spinner />
              Sign In...
            </>
          ) : (
            <>
              Sign in
              <ArrowRight className="ml-1 size-4" />
            </>
          )}
        </Button>
      </form>

      <div className="relative">
        <FieldSeparator>Or continue with</FieldSeparator>
      </div>

      <div className="overflow-hidden rounded-xl [&_button]:!h-11 [&_button]:!w-full [&_button]:!rounded-xl">
        <GoogleLoginOAuth />
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-primary underline-offset-4 hover:underline"
        >
          Create account
        </Link>
      </p>
    </div>
  );
}
