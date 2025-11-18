"use client";

import { useState } from "react";
import { useQuery, useApolloClient } from "@apollo/client";
import { debounce } from "lodash";
import TabNavigation from "@/components/mypage/tab-navigation";
import FeaturedCard from "@/components/trips-list/featured-card";
import PromoBanner from "@/components/trips-list/promo-banner";
import SearchSection from "@/components/trips-list/search-section";
import FilterSection from "@/components/trips-list/filter-section";
import AccommodationCard from "@/components/trips-list/accommodation-card";
import styles from "./styles.module.css";
import { FETCH_TRAVELPRODUCTS } from "./queries";
import { FETCH_TRAVELPRODUCT } from "./[tripId]/queries";
import type { Travelproduct } from "@/commons/graphql/graphql";

// Mock 데이터 (추천 상품, 최근 본 상품용)
// Note: FeaturedCard의 ID는 실제 DB의 상품 ID여야 합니다
const MOCK_DATA = {
  featured: [
    {
      id: "1",
      title: "포항 : 당장 가고 싶은 숙소",
      description: "살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고 쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라 우러라 우러라 새여 자고 니러 우러라 새여 널라와 시름 한 나도 자고 니러 우니로라 얄리얄리 얄라셩 얄라리 얄라",
      price: 32900,
      bookmarkCount: 24,
      image: "/assets/images/tripsbg1.jpg",
    },
    {
      id: "2",
      title: "강릉 : 마음까지 깨끗해지는 하얀 숙소",
      description: "살어리 살어리랏다 강릉에 평생 살어리랏다",
      price: 32900,
      bookmarkCount: 24,
      image: "/assets/images/tripsbg2.jpg",
    },
  ],
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
  const client = useApolloClient();

  // GraphQL 쿼리로 숙소 데이터 조회
  const { data, loading, error } = useQuery(FETCH_TRAVELPRODUCTS, {
    variables: {
      page: 1,
      isSoldout: activeTab === "closed",
    },
  });

  // Debounce 적용: 마우스를 빠르게 움직일 때 불필요한 요청을 방지
  const prefetchTravelproductDebounce = debounce((productId: string) => {
    client.query({
      query: FETCH_TRAVELPRODUCT,
      variables: { travelproductId: productId },
    }).then((result) => {
      // 이미지 프리페치: 브라우저 캐시에 미리 로드
      const travelproduct = result.data?.fetchTravelproduct;

      // 상품 이미지 캐싱
      if (travelproduct?.images && travelproduct.images.length > 0) {
        travelproduct.images.forEach((imagePath: string) => {
          const img = new Image();
          img.src = `https://storage.googleapis.com/${imagePath}`;
        });
      }

      // 판매자 프로필 이미지 캐싱
      if (travelproduct?.seller?.picture) {
        const sellerImg = new Image();
        sellerImg.src = `https://storage.googleapis.com/${travelproduct.seller.picture}`;
      }
    });
  }, 200);

  // Prefetch 함수 실행
  const prefetchTravelproduct = (productId: string) => () => {
    prefetchTravelproductDebounce(productId);
  };

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
            {loading && <p>로딩 중...</p>}
            {error && <p>오류가 발생했습니다: {error.message}</p>}
            {data?.fetchTravelproducts?.map((product: Travelproduct) => (
              <AccommodationCard
                key={product._id}
                id={product._id}
                title={product.name}
                description={product.remarks}
                tags={product.tags?.join(" #") ?? ""}
                price={product.price ?? 0}
                bookmarkCount={product.pickedCount ?? 0}
                image={product.images?.[0] ?? ""}
                seller={{
                  name: product.seller?.name ?? "",
                  profileImage: product.seller?.picture ?? null,
                }}
                onMouseEnter={prefetchTravelproduct(product._id)}
              />
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
