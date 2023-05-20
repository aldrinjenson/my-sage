import { useEffect } from "react";
import { useRouter } from "next/router";
import useAuth from "../hooks/useAuth";

const PROTECTED_ROUTES = ["/dashboard", "/onboarding"];

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const user = useAuth();

  useEffect(() => {
    if (!user && PROTECTED_ROUTES.includes(router.pathname)) {
      router.replace("/login");
    }
  }, [user, router]);

  if (!user && PROTECTED_ROUTES.includes(router.pathname)) {
    return "bro";
  }

  return children;
};

export default ProtectedRoute;
