"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await authClient.signOut();
    router.push("/authenticate");
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="cursor-pointer text-sm text-foreground/60 transition-colors hover:text-foreground"
    >
      Sign out
    </button>
  );
}