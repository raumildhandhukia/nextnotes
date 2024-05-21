import { LoginForm } from "@/app/components/auth/login-form";
import { Suspense } from "react";
const LoginPage = () => {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
};
export default LoginPage;
