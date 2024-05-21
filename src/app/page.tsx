// "use client";
// import { useRouter } from "next/navigation";
import { Button } from "../components/ui/button";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { LoginButton } from "./components/auth/login-button";
import { RegisterButton } from "./components/auth/register-button";

const font = Poppins({ subsets: ["latin"], weight: ["600"] });

export default function SignInPage() {
  // const router = useRouter();
  // router.push("/auth/login");
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-gradient-to-tr from-zinc-800 via-zinc-200 to-zinc-600 dark:from-gray-900 dark:via-gray-600 dark:to-gray-900">
      <div className="space-y-6">
        <h1
          className={cn(
            "text-6xl font-semibold text-gray-800 drop-shadow-md dark:text-indigo-200",
            font.className
          )}
        >
          🗒️ next-notes
        </h1>
        <p>a minimal collaberative web notes application</p>
        <div className="flex justify-center items-center gap-5">
          <LoginButton>
            <Button variant="default" size="lg">
              Log In
            </Button>
          </LoginButton>
          <RegisterButton>
            <Button
              variant="destructive"
              size="lg"
              className="dark: bg-red-800"
            >
              Register
            </Button>
          </RegisterButton>
        </div>
      </div>
    </main>
  );
}
