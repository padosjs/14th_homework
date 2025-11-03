import styles from "./styles.module.css";

interface PointsRecord {
  id: number;
  date: string;
  content: string;
  amount: number;
  balance: number;
  type: "charge" | "purchase" | "sale";
}

interface PointsTableProps {
  records: PointsRecord[];
}

export default function PointsTable({ records }: PointsTableProps) {
  const formatPoints = (points: number) => {
    return points.toLocaleString("ko-KR");
  };

  const getAmountClass = (amount: number) => {
    if (amount > 0) return styles.positive;
    if (amount < 0) return styles.negative;
    return "";
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      charge: "충전",
      purchase: "구매",
      sale: "판매",
    };
    return labels[type] || type;
  };

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>날짜</th>
            <th className={styles.th}>내용</th>
            <th className={styles.th}>거래 및 충전 내역</th>
            <th className={styles.th}>잔액</th>
          </tr>
        </thead>
        <tbody>
          {records.length === 0 ? (
            <tr>
              <td colSpan={4} className={styles.emptyCell}>
                포인트 내역이 없습니다.
              </td>
            </tr>
          ) : (
            records.map((record) => (
              <tr key={record.id} className={styles.tr}>
                <td className={styles.td}>{record.date}</td>
                <td className={styles.td}>
                  <span className={styles.contentBadge}>
                    {getTypeLabel(record.type)}
                  </span>
                </td>
                <td className={`${styles.td} ${getAmountClass(record.amount)}`}>
                  {record.amount > 0 ? "+" : ""}
                  {formatPoints(record.amount)}
                </td>
                <td className={styles.td}>{formatPoints(record.balance)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
