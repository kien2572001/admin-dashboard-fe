import { useRouter } from "next/router";
import { useAuth } from "../services/hooks/useAuth";
import { RouterLinks } from "../enums/RouterLinks";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isInitialized, isAuthenticated } = useAuth();
  const router = useRouter();
  if (!isInitialized) {
    return <div>Loading...</div>;
  }
  if (!isAuthenticated) {
    router.push(RouterLinks.LOGIN);
    return null;
  }
  return <>{children}</>;
};

export default AuthGuard;
