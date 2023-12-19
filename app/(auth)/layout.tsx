import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-red-400 h-full">
      {children}
    </div>
  );
}

export default AuthLayout;