import { ReactNode } from "react";
import AuthModal from "../AuthModal";

interface LayoutIProps {
  children: ReactNode;
}

const RouterLayout = ({ children }: LayoutIProps) => {
  return (
    <>
      {children}
      <AuthModal />
    </>
  );
};

export default RouterLayout;
