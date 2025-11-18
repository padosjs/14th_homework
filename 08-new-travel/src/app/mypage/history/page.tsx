"use client";

import { useState } from "react";
import { useQuery } from "@apollo/client";
import UserInfoCard from "@/components/mypage/user-info-card";
import TabNavigation from "@/components/mypage/tab-navigation";
import TransactionTable from "@/components/mypage/transaction-table";
import SearchBar from "@/components/mypage/search-bar";
import {
  mockTransactions,
  mockBookmarks,
} from "@/lib/mock-data";
import { FETCH_USER_LOGGED_IN } from "@/lib/queries/user";
import styles from "./styles.module.css";

const tabs = [
  { id: "transactions", label: "거래내역" },
  { id: "bookmarks", label: "북마크" },
];

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState("transactions");
  const [searchQuery, setSearchQuery] = useState("");

  // Apollo 캐시에서 사용자 정보 조회 (서버에 쿼리하지 않음)
  const { data } = useQuery(FETCH_USER_LOGGED_IN, {
    fetchPolicy: 'cache-first'
  });

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
        name={data?.fetchUserLoggedIn?.name || ""}
        points={data?.fetchUserLoggedIn?.userPoint?.amount || 0}
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
