"use client";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "@/components/ui/toast";
import { useGoogleLogin } from "@/hook";

export default function GoogleLoginOAuth() {
  const router = useRouter();
  const { mutate: googleLogin, isPending } = useGoogleLogin();

  const handleGoogleSuccess = (credentialResponse: { credential?: string }) => {
    const idToken = credentialResponse.credential;
    if (!idToken) {
      toast.add({
        title: "Google OAuth failed",
        description: "Something went wrong",
        type: "error",
      });
      return;
    }

    googleLogin(
      { credential: idToken },
      {
        onSuccess: () => {
          toast.add({
            title: "Google login successful",
            description: "Welcome back!",
            type: "success",
          });

          // 👈 router.push("/") er bodole window.location.href use korben
          // jate cross-domain cookies browser-e instant fresh load hoi eta dile
          window.location.href = "/";
        },
        onError: (err: any) => {
          toast.add({
            title: "Google OAuth failed",
            description: err?.message || "Something went wrong",
            type: "error",
          });
        },
      },
    );
  };

  const handleGoogleError = () => {
    toast.add({
      title: "Google OAuth failed",
      description: "Something went wrong",
      type: "error",
    });
  };

  return (
    <div className={isPending ? "pointer-events-none opacity-60" : ""}>
      <GoogleLogin
        theme="outline"
        shape="pill"
        text="continue_with"
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}
      />
    </div>
  );
}
