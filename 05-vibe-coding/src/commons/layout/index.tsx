import Image from "next/image";
import styles from "./styles.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoText}>민지의 다이어리</span>
        </div>
      </header>
      <div className={styles.gap}></div>
      <div className={styles.banner}>
        <Image
          src="/images/banner.png"
          alt="banner"
          fill
          className={styles.bannerImage}
        />
      </div>
      <div className={styles.gap}></div>
      <nav className={styles.navigation}>
        <div className={styles.tabContainer}>
          <div className={styles.tabActive}>
            <span className={styles.tabActiveText}>일기보관함</span>
          </div>
          <div className={styles.tab}>
            <span className={styles.tabText}>사진보관함</span>
          </div>
        </div>
      </nav>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <h3 className={styles.footerTitle}>민지의 다이어리</h3>
          <p className={styles.footerCeo}>대표 : {"{name}"}</p>
          <p className={styles.footerCopyright}>
            Copyright © 2024. {"{name}"} Co., Ltd.
          </p>
        </div>
      </footer>
    </div>
  );
}

