import type { Metadata } from "next";
import Link from "next/link";
import LoginForm from "@/app/components/LoginForm";

export const metadata: Metadata = {
  title: "Client Login",
  description: "Sign in to access project files and account details.",
};

export default function LoginPage() {
  return (
    <main className="flex-1">
      <section className="page-shell flex justify-center py-14 md:py-24">
        <div className="flex w-full max-w-[380px] flex-col gap-7">
          <div className="text-center">
            <h1 className="text-2xl">Client &amp; Trade Login</h1>
            <p className="mt-2 text-[13px] text-muted">
              Sign in to access project files and account details.
            </p>
          </div>

          <LoginForm />

          <div className="text-center">
            <Link href="/" className="text-xs">
              ← Back to site
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
