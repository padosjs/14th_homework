"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { URL_PATHS } from "@/commons/constants/url";

interface User {
  _id: string;
  name: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // 로그인 상태 실시간 감지
  useEffect(() => {
    const checkAuthStatus = () => {
      const accessToken = localStorage.getItem("accessToken");
      const userString = localStorage.getItem("user");

      if (accessToken) {
        setIsLoggedIn(true);
        if (userString) {
          try {
            setUser(JSON.parse(userString));
          } catch {
            setUser(null);
          }
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    // 초기 체크
    checkAuthStatus();

    // storage 이벤트 리스너 (다른 탭에서의 변경사항 감지)
    const handleStorageChange = () => {
      checkAuthStatus();
    };

    window.addEventListener("storage", handleStorageChange);

    // 커스텀 이벤트 리스너 (같은 탭에서의 변경사항 감지)
    const handleAuthChange = () => {
      checkAuthStatus();
    };

    window.addEventListener("auth-change", handleAuthChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("auth-change", handleAuthChange);
    };
  }, [pathname]); // pathname 변경 시에도 체크

  const login = () => {
    router.push(URL_PATHS.auth.login);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    
    // 커스텀 이벤트 발생
    window.dispatchEvent(new Event("auth-change"));
    
    router.push(URL_PATHS.auth.login);
  };

  const value: AuthContextType = {
    isLoggedIn,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

