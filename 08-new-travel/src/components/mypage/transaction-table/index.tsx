"use client";

import StatusBadge from "../status-badge";
import styles from "./styles.module.css";

interface Transaction {
  id: number;
  productName: string;
  price: number;
  date: string;
  status: "판매중" | "판매 완료" | "예약중";
}

interface TransactionTableProps {
  transactions: Transaction[];
  onDelete?: (id: number) => void;
}

export default function TransactionTable({
  transactions,
  onDelete,
}: TransactionTableProps) {
  const formatPrice = (price: number) => {
    return price.toLocaleString("ko-KR");
  };

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>번호</th>
            <th className={styles.th}>상품명</th>
            <th className={styles.th}>판매가격</th>
            <th className={styles.th}>날짜</th>
            <th className={styles.th}>상태</th>
            {onDelete && <th className={styles.th}>작업</th>}
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan={onDelete ? 6 : 5} className={styles.emptyCell}>
                거래내역이 없습니다.
              </td>
            </tr>
          ) : (
            transactions.map((transaction, index) => (
              <tr key={transaction.id} className={styles.tr}>
                <td className={styles.td}>{index + 1}</td>
                <td className={`${styles.td} ${styles.productName}`}>
                  {transaction.productName}
                </td>
                <td className={styles.td}>{formatPrice(transaction.price)}원</td>
                <td className={styles.td}>{transaction.date}</td>
                <td className={styles.td}>
                  <StatusBadge status={transaction.status} />
                </td>
                {onDelete && (
                  <td className={styles.td}>
                    <button
                      onClick={() => onDelete(transaction.id)}
                      className={styles.deleteButton}
                      aria-label="삭제"
                    >
                      ✕
                    </button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
