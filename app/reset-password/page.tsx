import { Suspense } from "react";
import ResetPasswordForm from "./ResetPasswordForm";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Suspense fallback={<p className="text-white">Loading...</p>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
