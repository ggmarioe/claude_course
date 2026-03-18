import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { getDb } from "@/lib/db";

export const auth = betterAuth({
  database: getDb(),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies()],
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
});

export async function getCurrentUser(headers: Headers) {
  const session = await auth.api.getSession({ headers });
  return session?.user ?? null;
}
