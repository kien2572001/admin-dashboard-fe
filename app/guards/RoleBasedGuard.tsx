import { useAuth } from "../services/hooks/useAuth";

export interface RoleBasedGuardProps {
  accessibleRoles: string[];
  children: React.ReactNode;
}

const RoleBasedGuard = ({ accessibleRoles, children }: RoleBasedGuardProps) => {
  const { user } = useAuth();

  if (!accessibleRoles.includes(user?.role || "")) {
    return (
      <div>
        <h1>403 Forbidden</h1>
        <p>You don't have permission to access this page.</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default RoleBasedGuard;
