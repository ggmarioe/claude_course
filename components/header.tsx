import Link from "next/link";
import { headers } from "next/headers";
import { getCurrentUser } from "@/lib/auth";
import { LogoutButton } from "./logout-button";

export async function Header() {
  const user = await getCurrentUser(await headers());

  return (
    <header className="border-b border-foreground/10">
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/dashboard" className="text-lg font-bold tracking-tight">
          Next<span className="text-foreground/60">n</span>Notes
        </Link>
        {user && <LogoutButton />}
      </nav>
    </header>
  );
}
