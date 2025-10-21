"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { useLinkRouting } from "./hooks/index.link.routing.hook";
import { useAreaVisibility } from "./hooks/index.area.hook";
import { useAuthStatus } from "./hooks/index.auth.hook";
import { Button } from "@/commons/components/button";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const {
    handleLogoClick,
    handleDiariesClick,
    handlePicturesClick,
    isActiveDiaries,
    isActivePictures,
  } = useLinkRouting();

  const { showHeader, showBanner, showNavigation, showFooter } =
    useAreaVisibility();

  const { isLoggedIn, userName, handleLogin, handleLogout } = useAuthStatus();

  return (
    <div className={styles.container}>
      {showHeader && (
        <header className={styles.header} data-testid="layout-header">
          <div
            className={styles.logo}
            onClick={handleLogoClick}
            data-testid="layout-logo"
          >
            <span className={styles.logoText}>민지의 다이어리</span>
          </div>
          <div className={styles.authStatus} data-testid="auth-status">
            {isLoggedIn ? (
              <>
                <span className={styles.userName} data-testid="user-name">
                  {userName}
                </span>
                <Button
                  variant="secondary"
                  size="medium"
                  theme="light"
                  className={styles.logoutButton}
                  onClick={handleLogout}
                  data-testid="logout-button"
                >
                  로그아웃
                </Button>
              </>
            ) : (
              <Button
                variant="secondary"
                size="medium"
                theme="light"
                className={styles.loginButton}
                onClick={handleLogin}
                data-testid="login-button"
              >
                로그인
              </Button>
            )}
          </div>
        </header>
      )}
      {showHeader && <div className={styles.gap}></div>}
      {showBanner && (
        <div className={styles.banner} data-testid="layout-banner">
          <Image
            src="/images/banner.png"
            alt="banner"
            fill
            className={styles.bannerImage}
          />
        </div>
      )}
      {showBanner && <div className={styles.gap}></div>}
      {showNavigation && (
        <nav className={styles.navigation} data-testid="layout-navigation">
          <div className={styles.tabContainer}>
            <div
              className={isActiveDiaries ? styles.tabActive : styles.tab}
              onClick={handleDiariesClick}
              data-testid="tab-diaries"
              data-active={isActiveDiaries}
            >
              <span
                className={
                  isActiveDiaries ? styles.tabActiveText : styles.tabText
                }
              >
                일기보관함
              </span>
            </div>
            <div
              className={isActivePictures ? styles.tabActive : styles.tab}
              onClick={handlePicturesClick}
              data-testid="tab-pictures"
              data-active={isActivePictures}
            >
              <span
                className={
                  isActivePictures ? styles.tabActiveText : styles.tabText
                }
              >
                사진보관함
              </span>
            </div>
          </div>
        </nav>
      )}
      <main className={styles.main}>{children}</main>
      {showFooter && (
        <footer className={styles.footer} data-testid="layout-footer">
          <div className={styles.footerContent}>
            <h3 className={styles.footerTitle}>민지의 다이어리</h3>
            <p className={styles.footerCeo}>대표 : {"{name}"}</p>
            <p className={styles.footerCopyright}>
              Copyright © 2024. {"{name}"} Co., Ltd.
            </p>
          </div>
        </footer>
      )}
    </div>
  );
}

