import styles from "./styles.module.css";

interface StatusBadgeProps {
  status: "판매중" | "판매 완료" | "예약중";
  variant?: "default" | "completed" | "reserved";
}

export default function StatusBadge({
  status,
  variant = "default",
}: StatusBadgeProps) {
  const getVariant = () => {
    if (variant !== "default") return variant;
    switch (status) {
      case "판매 완료":
        return "completed";
      case "예약중":
        return "reserved";
      default:
        return "default";
    }
  };

  const variantClass = getVariant();

  return (
    <span className={`${styles.badge} ${styles[variantClass]}`}>
      {status}
    </span>
  );
}
