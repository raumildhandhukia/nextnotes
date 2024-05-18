import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="auth-layout">
      <nav className="bg-blue-200 text-white">This is Auth Nav</nav>
      {children}
    </div>
  );
};

export default AuthLayout;
