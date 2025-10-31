"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Banner } from "@/components/layout/Banner";
import ApolloProvider from "@/lib/apollo/ApolloProvider";
import { AuthProvider } from "@/lib/auth/AuthContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Header를 숨길 페이지 경로
  const hideHeaderPaths = ["/login", "/signup"];

  // Banner를 숨길 페이지 경로
  const hideBannerPaths = ["/login", "/signup", "/boards/new"];

  // 동적 라우트 매칭을 위한 정규식 (예: /boards/[boardId]/edit)
  const hideBannerRegex = /^\/boards\/[^/]+\/edit$/;

  // 현재 경로가 숨길 경로에 해당하는지 확인하는 함수
  const shouldHideComponent = (
    paths: string[],
    currentPath: string,
    regex?: RegExp
  ) => {
    // 정규식 매칭 확인
    if (regex && regex.test(currentPath)) {
      return true;
    }

    // 경로 배열 매칭 확인
    return paths.some((path) => {
      // 정확한 경로 매칭 또는 시작 경로 매칭
      return currentPath === path || currentPath.startsWith(path + "/");
    });
  };

  const showHeader = !shouldHideComponent(hideHeaderPaths, pathname);
  const showBanner = !shouldHideComponent(hideBannerPaths, pathname, hideBannerRegex);

  return (
    <ApolloProvider>
      <AuthProvider>
        <div className="flex flex-col items-center w-full min-h-screen">
          {showHeader && <Header />}
          {showBanner && <Banner />}

          {/* Main Content */}
          <main className="w-full bg-white">
            {children}
          </main>
        </div>
      </AuthProvider>
    </ApolloProvider>
  );
}
