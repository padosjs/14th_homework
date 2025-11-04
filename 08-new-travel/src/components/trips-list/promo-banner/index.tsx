import styles from "./styles.module.css";

export default function PromoBanner() {
  return (
    <div className={styles.banner}>
      <div className={styles.imageContainer}>
        <img
          src="/assets/images/bg.jpg"
          alt="빌 페소 르꼬 전시회"
          className={styles.image}
        />
        <div className={styles.gradient} />
      </div>

      <div className={styles.content}>
        <div className={styles.badges}>
          <div className={styles.badge}>
            <p className={styles.badgeText}>'솔로트립' 독점 숙소</p>
          </div>
          <div className={styles.badge}>
            <p className={styles.badgeText}>9.24 얼리버드 오픈 예약</p>
          </div>
        </div>
        <div className={styles.textContent}>
          <p className={styles.line1}>천만 관객이 사랑한</p>
          <p className={styles.line2}>빌 페소 르꼬 전시회 근처 숙소 특가 예약</p>
        </div>
      </div>
    </div>
  );
}
