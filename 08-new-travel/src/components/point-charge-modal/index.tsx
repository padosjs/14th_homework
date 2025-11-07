"use client";

import { useState } from "react";
import { useMutation, useApolloClient, gql } from "@apollo/client";
import * as PortOne from "@portone/browser-sdk/v2";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { useUserPointsStore } from "@/commons/stores/user-points-store";
import { CREATE_POINT_TRANSACTION_OF_LOADING } from "./mutations";
import styles from "./styles.module.css";

const CHARGE_AMOUNTS = [100, 500, 2000, 5000, 10000, 50000];

// 레이아웃에서 사용하는 쿼리와 동일하게 정의
const FETCH_USER_LOGGED_IN = gql`
  query {
    fetchUserLoggedIn {
      _id
      email
      name
      userPoint {
        _id
        amount
      }
    }
  }
`;

export default function PointChargeModal() {
  const { isChargeModalOpen, closeChargeModal, setPoints, isLoading, setIsLoading } =
    useUserPointsStore();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [createPointTransaction] = useMutation(
    CREATE_POINT_TRANSACTION_OF_LOADING
  );
  const client = useApolloClient();

  const handleChargeClick = async () => {
    if (!selectedAmount) {
      alert("금액을 선택해주세요");
      return;
    }

    setIsLoading(true);

    try {
      // PortOne 결제 요청
      const rsp = await PortOne.requestPayment({
        storeId: process.env.NEXT_PUBLIC_PORTONE_STORE_ID || "",
        paymentId: `payment-${crypto.randomUUID()}`,
        orderName: "포인트 충전",
        totalAmount: selectedAmount,
        currency: "CURRENCY_KRW",
        channelKey: process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY || "",
        payMethod: "EASY_PAY",
        redirectUrl: `${typeof window !== "undefined" ? window.location.origin : ""}/payment-result`,
      });

      if (!rsp) {
        alert("결제가 취소되었습니다");
        setIsLoading(false);
        return;
      }

      // V2 SDK: code가 존재하면 실패, 없으면 성공
      if (rsp.code) {
        alert(rsp.message || "결제에 실패했습니다");
        setIsLoading(false);
        return;
      }

      // 백엔드에 결제 정보 검증 요청
      const result = await createPointTransaction({
        variables: { paymentId: rsp.paymentId },
      });

      if (result.data?.createPointTransactionOfLoading) {
        const { balance } = result.data.createPointTransactionOfLoading;

        // 1. Zustand 스토어 업데이트
        setPoints(balance);

        // 2. Apollo Cache 업데이트 (네비게이션 자동 갱신!)
        try {
          const currentData = client.readQuery({ query: FETCH_USER_LOGGED_IN });
          if (currentData?.fetchUserLoggedIn) {
            client.writeQuery({
              query: FETCH_USER_LOGGED_IN,
              data: {
                fetchUserLoggedIn: {
                  ...currentData.fetchUserLoggedIn,
                  userPoint: {
                    ...currentData.fetchUserLoggedIn.userPoint,
                    amount: balance,
                  },
                },
              },
            });
          }
        } catch (error) {
          console.warn("Apollo cache 업데이트 실패:", error);
        }

        alert(`${selectedAmount.toLocaleString()}원이 충전되었습니다!`);
        closeChargeModal();
        setSelectedAmount(null);
      }
    } catch (error) {
      console.error("충전 실패:", error);
      alert("충전 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog open={isChargeModalOpen} onOpenChange={closeChargeModal}>
      <AlertDialogContent className={styles.modalContent}>
        <AlertDialogHeader className={styles.header}>
          <div className={styles.iconWrapper}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="56"
              viewBox="0 0 80 56"
              fill="none"
            >
              <rect
                x="8"
                y="8"
                width="64"
                height="40"
                rx="4"
                fill="#E8F0FF"
                stroke="#2974E5"
                strokeWidth="2"
              />
              <path
                d="M40 28L32 20M40 28L48 20M40 28V36"
                stroke="#2974E5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <AlertDialogTitle className={styles.title}>
            충전하실 금액을 선택해 주세요
          </AlertDialogTitle>
        </AlertDialogHeader>

        <div className={styles.amountSelector}>
          <select
            value={selectedAmount || ""}
            onChange={(e) => setSelectedAmount(Number(e.target.value))}
            className={styles.select}
          >
            <option value="">금액을 선택해주세요</option>
            {CHARGE_AMOUNTS.map((amount) => (
              <option key={amount} value={amount}>
                {amount.toLocaleString()}원
              </option>
            ))}
          </select>
        </div>

        <AlertDialogFooter className={styles.footer}>
          <AlertDialogCancel
            onClick={closeChargeModal}
            className={styles.cancelButton}
          >
            취소
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleChargeClick}
            disabled={!selectedAmount || isLoading}
            className={styles.chargeButton}
          >
            {isLoading ? "처리 중..." : "충전하기"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
