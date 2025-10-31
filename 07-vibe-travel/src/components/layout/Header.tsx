"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth/AuthContext";

export function Header() {
  const router = useRouter();
  const { accessToken, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="w-full h-[80px] bg-white flex items-center justify-center px-4">
      <div className="w-[1280px] h-full flex items-center justify-between">
        {/* Logo and Navigation */}
        <div className="flex items-center gap-6">
          {/* Logo */}
          <Link href="/">
            <div className="w-[56px] h-[32px] flex items-center cursor-pointer">
              <Image
                src="/images/logo-black.svg"
                alt="Logo"
                width={52}
                height={32}
              />
            </div>
          </Link>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-4 h-[40px]">
            <Link href="/boards">
              <button className="px-2 h-full flex items-center justify-center typography-sb-16-24 text-gray-950 border-b-2 border-gray-950">
                트립토크
              </button>
            </Link>
            <button className="px-2 h-full flex items-center justify-center typography-me-16-24 text-gray-800 hover:bg-gray-100">
              숙박권 구매
            </button>
            <button className="px-2 h-full flex items-center justify-center typography-me-16-24 text-gray-800 hover:bg-gray-100">
              마이 페이지
            </button>
          </nav>
        </div>

        {/* Auth Button */}
        <div className="flex items-center">
          {accessToken ? (
            <Button
              variant="tertiary"
              size="s"
              className="w-auto h-[40px]"
              onClick={handleLogout}
            >
              로그아웃
            </Button>
          ) : (
            <Link href="/login">
              <Button
                variant="quaternary"
                size="s"
                className="w-auto h-[40px] rounded-full"
              >
                로그인
                <img
                  src="/icons/outline/right_arrow.svg"
                  alt="arrow"
                  className="w-5 h-5 brightness-0 invert"
                />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
