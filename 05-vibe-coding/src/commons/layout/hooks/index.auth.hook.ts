import { useAuth } from "@/commons/providers/auth/auth.provider";

export const useAuthStatus = () => {
  const { isLoggedIn, user, login, logout } = useAuth();

  return {
    isLoggedIn,
    userName: user?.name || "",
    handleLogin: login,
    handleLogout: logout,
  };
};

