import { useAuth } from "../services/hooks/useAuth";
import { useRouter } from "next/router";
import { RouterLinks } from "../enums/RouterLinks";

const GuestGuard = ({ children }: { children: React.ReactNode }) => {
  const { isInitialized, isAuthenticated } = useAuth();
  const router = useRouter();
  if (!isInitialized) {
    return <div>Loading...</div>;
  }
  if (isAuthenticated) {
    router.push(RouterLinks.HOME);
    return null;
  }
  return <>{children}</>;
};

export default GuestGuard;
