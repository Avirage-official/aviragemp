"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function PostSignInPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) {
      router.replace("/sign-in");
      return;
    }

    const run = async () => {
      try {
        /**
         * 1. Check if user exists in DB
         */
        const res = await fetch(`/api/users/${user.id}/type`);

        // USER DOES NOT EXIST → onboarding
        if (res.status === 404) {
          router.replace("/onboarding");
          return;
        }

        if (!res.ok) {
          console.error("Failed to fetch user type");
          router.replace("/onboarding");
          return;
        }

        const { type } = await res.json();

        /**
         * 2. Route by user type
         */
        if (type === "BUSINESS") {
          router.replace("/business/dashboard");
          return;
        }

        if (type === "CONSUMER") {
          router.replace("/dashboard");
          return;
        }

        /**
         * 3. Fallback (future-proof)
         */
        router.replace("/onboarding");
      } catch (err) {
        console.error("Post-signin routing failed", err);
        router.replace("/onboarding");
      }
    };

    run();
  }, [isLoaded, user, router]);

  return null; // no UI, pure router
}
