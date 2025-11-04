"use client";

import { useState } from "react";
import TabNavigation from "@/components/mypage/tab-navigation";
import FeaturedCard from "@/components/trips-list/featured-card";
import PromoBanner from "@/components/trips-list/promo-banner";
import SearchSection from "@/components/trips-list/search-section";
import FilterSection from "@/components/trips-list/filter-section";
import AccommodationCard from "@/components/trips-list/accommodation-card";
import styles from "./styles.module.css";

// Mock 데이터
const MOCK_DATA = {
  featured: [
    {
      id: "1",
      title: "포항 : 당장 가고 싶은 숙소",
      description: "살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고 쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라 우러라 우러라 새여 자고 니러 우러라 새여 널라와 시름 한 나도 자고 니러 우니로라 얄리얄리 얄라셩 얄라리 얄라",
      price: 32900,
      bookmarkCount: 24,
      image: "/assets/images/bannerA.jpg",
    },
    {
      id: "2",
      title: "강릉 : 마음까지 깨끗해지는 하얀 숙소",
      description: "살어리 살어리랏다 강릉에 평생 살어리랏다",
      price: 32900,
      bookmarkCount: 24,
      image: "/assets/images/bannerB.jpg",
    },
  ],
  accommodations: Array.from({ length: 8 }, (_, i) => ({
    id: `acc-${i + 1}`,
    title: "살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고 쳥산(靑山)애 살어리랏다",
    description: "살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고 쳥산(靑山)애 살어리랏다",
    tags: "#6인 이하 #건식 사우나 #애견동반 가능",
    price: 32900,
    bookmarkCount: 24,
    image: `/assets/images/banner${['A', 'B', 'C'][i % 3]}.jpg`,
    seller: { name: "빈얀트리" },
  })),
  recent: [
    { id: "r1", image: "/assets/images/bannerA.jpg" },
    { id: "r2", image: "/assets/images/bannerB.jpg" },
    { id: "r3", image: "/assets/images/bannerC.jpg" },
  ],
};

const TABS = [
  { id: "available", label: "예약 가능 숙소" },
  { id: "closed", label: "예약 마감 숙소" },
];

export default function TripsPage() {
  const [activeTab, setActiveTab] = useState("available");

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* 추천 숙소 섹션 */}
        <section className={styles.featuredSection}>
          <h2 className={styles.sectionTitle}>2024 끝여름 낭만있게 마무리 하고 싶다면?</h2>
          <div className={styles.featuredGrid}>
            {MOCK_DATA.featured.map((item) => (
              <FeaturedCard key={item.id} {...item} />
            ))}
          </div>
        </section>

        {/* 프로모 배너 */}
        <PromoBanner />

        {/* 검색 섹션 */}
        <section className={styles.searchSection}>
          <h2 className={styles.sectionTitle}>여기에서만 예약할 수 있는 숙소</h2>

          <TabNavigation tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

          <SearchSection />

          <FilterSection />

          {/* 숙소 그리드 */}
          <div className={styles.accommodationGrid}>
            {MOCK_DATA.accommodations.map((item) => (
              <AccommodationCard key={item.id} {...item} />
            ))}
          </div>
        </section>
      </div>

      {/* 최근 본 상품 플로팅 사이드바 */}
      <aside className={styles.recentItems}>
        <p className={styles.recentTitle}>최근 본 상품</p>
        <div className={styles.recentList}>
          {MOCK_DATA.recent.map((item) => (
            <div key={item.id} className={styles.recentItem}>
              <img src={item.image} alt="최근 본 상품" />
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
