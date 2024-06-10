export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  shop_id?: string;
}

export interface AuthState {
  isAuthenticated?: boolean;
  isInitialized?: boolean;
  user?: User | null;
}
