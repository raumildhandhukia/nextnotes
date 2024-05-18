"use client";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  router.push("/login");
}
