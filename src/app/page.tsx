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
    <main className="h-screen flex flex-col justify-center items-center dark:bg-black">
      <div className="space-y-6">
        <h1
          className={cn(
            "text-5xl font-semibold dark:text-indigo-300 ",
            font.className
          )}
        >
          🗒️ next-notes
        </h1>
        <p className="font-semibold dark:text-indigo-300 md:text-2xl">
          a minimal collaberative web notes application
        </p>
        <div className="flex flex-row justify-center items-center gap-5">
          <LoginButton>
            <Button size="lg">Log In</Button>
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
