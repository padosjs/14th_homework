import { BookmarkIcon } from '@heroicons/react/24/outline';
import styles from "./styles.module.css";

interface FeaturedCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  bookmarkCount: number;
  image: string;
}

export default function FeaturedCard({
  title,
  description,
  price,
  bookmarkCount,
  image,
}: FeaturedCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} className={styles.image} />
        <div className={styles.gradient} />
      </div>

      <div className={styles.bookmark}>
        <BookmarkIcon className={styles.bookmarkIcon} />
        <span className={styles.bookmarkCount}>{bookmarkCount}</span>
      </div>

      <div className={styles.content}>
        <div className={styles.textContent}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </div>
        <div className={styles.priceContainer}>
          <span className={styles.price}>{price.toLocaleString()}</span>
          <span className={styles.currency}>원</span>
        </div>
      </div>
    </div>
  );
}
