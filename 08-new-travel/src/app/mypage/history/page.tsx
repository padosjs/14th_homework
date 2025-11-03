"use client";

import { useState } from "react";
import UserInfoCard from "@/components/mypage/user-info-card";
import TabNavigation from "@/components/mypage/tab-navigation";
import TransactionTable from "@/components/mypage/transaction-table";
import SearchBar from "@/components/mypage/search-bar";
import {
  mockUserInfo,
  mockTransactions,
  mockBookmarks,
} from "@/lib/mock-data";
import styles from "./styles.module.css";

const tabs = [
  { id: "transactions", label: "거래내역" },
  { id: "bookmarks", label: "북마크" },
];

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState("transactions");
  const [searchQuery, setSearchQuery] = useState("");

  const getDisplayData = () => {
    const data = activeTab === "transactions" ? mockTransactions : mockBookmarks;
    if (!searchQuery) return data;

    return data.filter((item) =>
      item.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const displayData = getDisplayData();

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>거래내역&북마크</h1>

      <UserInfoCard
        name={mockUserInfo.name}
        points={mockUserInfo.points}
        profileImage={mockUserInfo.profileImage}
      />

      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <SearchBar
        placeholder="상품명을 검색하세요"
        onSearch={setSearchQuery}
      />

      <TransactionTable transactions={displayData} />
    </div>
  );
}
