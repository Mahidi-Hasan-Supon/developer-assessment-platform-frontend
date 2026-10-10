import VerifyAccountForm from "@/components/form/verifyLoginForm";
import { Suspense } from "react";

export default function VerifyAccountPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center">
          <p className="text-sm text-muted-foreground">
            Loading verification page...
          </p>
        </div>
      }
    >
      <VerifyAccountForm />
    </Suspense>
  );
}
