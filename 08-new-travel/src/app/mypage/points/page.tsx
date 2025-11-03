"use client";

import { useState, useMemo } from "react";
import UserInfoCard from "@/components/mypage/user-info-card";
import TabNavigation from "@/components/mypage/tab-navigation";
import PointsTable from "@/components/mypage/points-table";
import Pagination from "@/components/boards-list/pagination";
import {
  mockUserInfo,
  mockPointsHistory,
  getPointsHistoryByType,
} from "@/lib/mock-data";
import styles from "./styles.module.css";

const tabs = [
  { id: "all", label: "전체" },
  { id: "purchase", label: "구매내역" },
  { id: "sale", label: "판매내역" },
  { id: "charge", label: "충전내역" },
];

const ITEMS_PER_PAGE = 10;

export default function PointsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredRecords = useMemo(() => {
    return getPointsHistoryByType(
      activeTab as "all" | "purchase" | "sale" | "charge"
    );
  }, [activeTab]);

  const totalPages = Math.ceil(filteredRecords.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const displayRecords = filteredRecords.slice(startIndex, endIndex);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setCurrentPage(1); // 탭 변경 시 첫 페이지로 초기화
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>포인트 사용 내역</h1>

      <UserInfoCard
        name={mockUserInfo.name}
        points={mockUserInfo.points}
        profileImage={mockUserInfo.profileImage}
      />

      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      <PointsTable records={displayRecords} />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
