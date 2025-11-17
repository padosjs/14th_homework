import { useRouter } from 'next/navigation';
import { BookmarkIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import styles from "./styles.module.css";

interface AccommodationCardProps {
  id: string;
  title: string;
  description: string;
  tags: string;
  price: number;
  bookmarkCount: number;
  image: string;
  seller: {
    name: string;
    profileImage?: string | null;
  };
}

export default function AccommodationCard({
  id,
  title,
  description,
  tags,
  price,
  bookmarkCount,
  image,
  seller,
}: AccommodationCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/trips/${id}`);
  };

  return (
    <div className={styles.card} onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      {/* 이미지 영역 */}
      <div className={styles.imageSection}>
        <div className={styles.imageContainer}>
          <img
            src={`https://storage.googleapis.com/${image}`}
            alt={title}
            className={styles.image}
            onError={(e) => {
              e.currentTarget.src = '/assets/images/image_error.png';
            }}
          />
        </div>
        <div className={styles.bookmark}>
          <BookmarkIcon className={styles.bookmarkIcon} />
          <span className={styles.bookmarkCount}>{bookmarkCount}</span>
        </div>
      </div>

      {/* 텍스트 영역 */}
      <div className={styles.content}>
        <div className={styles.textContent}>
          <p className={styles.title}>{title}</p>
          <p className={styles.description}>{description}</p>
        </div>

        <div className={styles.infoSection}>
          <div className={styles.tags}>
            <p className={styles.tagsText}>{tags}</p>
          </div>

          <div className={styles.footer}>
            <div className={styles.seller}>
              {seller.profileImage ? (
                <img
                  src={`https://storage.googleapis.com/${seller.profileImage}`}
                  alt={seller.name}
                  className={styles.sellerImage}
                />
              ) : (
                <UserCircleIcon className={styles.sellerIcon} />
              )}
              <span className={styles.sellerName}>{seller.name}</span>
            </div>

            <div className={styles.priceContainer}>
              <span className={styles.price}>{price.toLocaleString()}</span>
              <span className={styles.currency}>원</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
