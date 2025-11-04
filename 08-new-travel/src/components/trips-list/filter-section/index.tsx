import {
  UserIcon,
  BuildingOfficeIcon,
  BuildingOffice2Icon,
  FireIcon,
  SparklesIcon,
  HomeModernIcon,
} from "@heroicons/react/24/outline";
import styles from "./styles.module.css";

// 간단한 아이콘 컴포넌트들 (Heroicons에 없는 것들은 대체)
const CampIcon = FireIcon; // 캠핑 -> 불 아이콘으로 대체
const RoomServiceIcon = SparklesIcon; // 룸 서비스 -> 스파클 아이콘으로 대체
const SpaIcon = SparklesIcon; // 스파
const HouseOnSeaIcon = HomeModernIcon; // 바다 위 숙소
const PlanteriorIcon = HomeModernIcon; // 플랜테리어

const FILTERS = [
  { id: "single", label: "1인 전용", Icon: UserIcon },
  { id: "apartment", label: "아파트", Icon: BuildingOfficeIcon },
  { id: "hotel", label: "호텔", Icon: BuildingOffice2Icon },
  { id: "camp", label: "캠핑", Icon: CampIcon },
  { id: "room-service", label: "룸 서비스 가능", Icon: RoomServiceIcon },
  { id: "fire", label: "불멍", Icon: FireIcon },
  { id: "spa", label: "반신욕&스파", Icon: SpaIcon },
  { id: "sea-house", label: "바다 위 숙소", Icon: HouseOnSeaIcon },
  { id: "planterior", label: "플랜테리어", Icon: PlanteriorIcon },
];

export default function FilterSection() {
  return (
    <div className={styles.container}>
      <div className={styles.filterList}>
        {FILTERS.map((filter) => (
          <div key={filter.id} className={styles.filterItem}>
            <filter.Icon className={styles.filterIcon} />
            <p className={styles.filterLabel}>{filter.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
