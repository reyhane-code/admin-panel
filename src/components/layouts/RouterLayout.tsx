import { ReactNode } from "react";
import AuthModal from "../AuthModal";

interface LayoutProps {
  children: ReactNode;
}

const RouterLayout = ({ children }: LayoutProps) => {
  return (
    <>
      {children}
      <AuthModal />
    </>
  );
};

export default RouterLayout;
