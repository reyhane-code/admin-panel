import { useEffect, ReactNode } from "react";
import useAuth from "../../hooks/useAuth";

interface LayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: LayoutProps) => {
  const { initAuth } = useAuth();

  useEffect(() => {
    const controller = new AbortController(); // Create an AbortController

    initAuth(controller.signal);

    return () => {
      controller.abort(); // Cleanup function to abort the fetch request
    };
  }, [initAuth]);

  return <>{children}</>;
};

export default AppLayout;
