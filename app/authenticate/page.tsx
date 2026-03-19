"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const inputClassName =
  "w-full rounded-md border border-foreground/20 bg-background px-3 py-2 text-sm outline-none focus-visible:border-foreground/40 focus-visible:ring-1 focus-visible:ring-foreground/20";

function AuthForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const mode = searchParams.get("mode") === "register" ? "register" : "login";
  const isRegister = mode === "register";

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = isRegister
        ? await authClient.signUp.email({
            name: formData.get("name") as string,
            email,
            password,
            callbackURL: "/dashboard",
          })
        : await authClient.signIn.email({
            email,
            password,
            callbackURL: "/dashboard",
          });

      if (result.error) {
        setError(
          result.error.message ??
            (isRegister ? "Registration failed" : "Login failed"),
        );
        setLoading(false);
        return;
      }

      router.push("/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <section className="w-full max-w-sm space-y-6">
        <header className="text-center">
          <h1 className="text-2xl font-bold">
            {isRegister ? "Create an account" : "Welcome back"}
          </h1>
          <p className="mt-1 text-sm text-foreground/60">
            {isRegister
              ? "Sign up to start taking notes"
              : "Sign in to your account"}
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className={inputClassName}
                placeholder="Your name"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className={inputClassName}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              autoComplete={isRegister ? "new-password" : "current-password"}
              className={inputClassName}
              placeholder="Min. 8 characters"
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-500">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-foreground px-3 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:ring-offset-2 disabled:opacity-50"
          >
            {loading
              ? "Please wait..."
              : isRegister
                ? "Create account"
                : "Sign in"}
          </button>
        </form>

        <p className="text-center text-sm text-foreground/60">
          {isRegister
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <Link
            href={
              isRegister
                ? "/authenticate?mode=login"
                : "/authenticate?mode=register"
            }
            className="font-medium text-foreground underline underline-offset-2"
          >
            {isRegister ? "Sign in" : "Sign up"}
          </Link>
        </p>
      </section>
    </main>
  );
}

export default function AuthenticatePage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <AuthForm />
    </Suspense>
  );
}
