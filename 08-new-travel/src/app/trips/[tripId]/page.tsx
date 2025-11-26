"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "@apollo/client";
import { ChatBubbleLeftIcon, BookmarkIcon, MapPinIcon, LinkIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Button from "@/components/button/button";
import KakaoMap from "@/components/KakaoMap";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { useUserPointsStore } from "@/commons/stores/user-points-store";
import { FETCH_TRAVELPRODUCT, DELETE_TRAVELPRODUCT } from "./queries";
import { FETCH_USER_LOGGED_IN } from "@/lib/queries/user";
import QuestionWrite from "@/components/trips-detail/question-write";
import QuestionList from "@/components/trips-detail/question-list";
import styles from "./styles.module.css";

export default function TripDetailPage() {
  const params = useParams();
  const router = useRouter();
  const tripId = params.tripId as string;
  const { data, loading, error } = useQuery(FETCH_TRAVELPRODUCT, {
    variables: { travelproductId: tripId },
  });

  const { data: userData } = useQuery(FETCH_USER_LOGGED_IN);

  const [deleteTravelproduct] = useMutation(DELETE_TRAVELPRODUCT);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInsufficientPointsModalOpen, setIsInsufficientPointsModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const { points, openChargeModal } = useUserPointsStore();

  const travelproduct = data?.fetchTravelproduct;
  const currentUser = userData?.fetchUserLoggedIn;

  const handlePurchase = () => {
    // 포인트 체크
    if (points < (travelproduct?.price || 0)) {
      setIsInsufficientPointsModalOpen(true);
      return;
    }

    // 포인트 충분 - 구매 진행
    console.log("구매 진행");
    setIsModalOpen(false);
  };

  const handleChargeFromInsufficientModal = () => {
    setIsInsufficientPointsModalOpen(false);
    openChargeModal();
  };

  const handleDelete = async () => {
    try {
      await deleteTravelproduct({
        variables: { travelproductId: tripId },
        update(cache, { data }) {
          if (data?.deleteTravelproduct) {
            cache.modify({
              fields: {
                fetchTravelproducts(existingTravelproducts = [], { readField }: any) {
                  return existingTravelproducts.filter(
                    (productRef: any) => readField('_id', productRef) !== tripId
                  );
                }
              }
            });
          }
        }
      });
      setIsDeleteConfirmOpen(false);
      router.push("/trips");
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  if (loading) {
    return (
      <div className={styles["page-container"]}>
        <div className={styles["content-wrapper"]}>
          <p>상품을 불러오는 중입니다...</p>
        </div>
      </div>
    );
  }

  if (error || !travelproduct) {
    return (
      <div className={styles["page-container"]}>
        <div className={styles["content-wrapper"]}>
          <p>상품을 불러올 수 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles["page-container"]}>
      <div className={styles["content-wrapper"]}>
        <div className={styles["title-header"]}>
          <div className={styles["title-section"]}>
            <h1 className={styles["title"]}>{travelproduct.name}</h1>
            <p className={styles["tags"]}>
              {travelproduct.tags?.map((tag: string) => `#${tag}`).join(" ")}
            </p>
          </div>
          <div className={styles["action-icons"]}>
            <AlertDialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
              <AlertDialogTrigger asChild>
                <button className={styles["icon-button"]}>
                  <TrashIcon className={styles["icon"]} />
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>정말 삭제하시겠어요?</AlertDialogTitle>
                  <AlertDialogDescription>
                    이 상품을 삭제하면 복구할 수 없습니다.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>취소</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>삭제</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <button className={styles["icon-button"]}>
              <LinkIcon className={styles["icon"]} />
            </button>
            <button className={styles["icon-button"]}>
              <MapPinIcon className={styles["icon"]} />
            </button>
            <div className={styles["bookmark-badge"]}>
              <BookmarkIcon className={styles["icon"]} />
              <span>{travelproduct.pickedCount}</span>
            </div>
          </div>

        </div>

        <div className={styles["layout-container"]}>
          <div className={styles["main-content"]}>


            <div className={styles["image-gallery"]}>
              <Swiper
                style={{
                  '--swiper-navigation-color': '#fff',
                  '--swiper-pagination-color': '#fff',
                } as React.CSSProperties}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className={styles["main-swiper"]}
              >
                {travelproduct.images?.map((image: string, index: number) => (
                  <SwiperSlide key={index} className={styles["main-slide"]}>
                    <img
                      src={`https://storage.googleapis.com/${image}`}
                      alt={`숙소 이미지 ${index + 1}`}
                      onError={(e) => {
                        e.currentTarget.src = '/assets/images/image_error.png';
                      }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              <Swiper
                direction="vertical"
                onSwiper={setThumbsSwiper}
                spaceBetween={16}
                slidesPerView={3}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className={styles["thumbnail-swiper"]}
              >
                {travelproduct.images?.map((image: string, index: number) => (
                  <SwiperSlide key={index} className={styles["thumbnail-slide"]}>
                    <img
                      src={`https://storage.googleapis.com/${image}`}
                      alt={`숙소 이미지 ${index + 1}`}
                      onError={(e) => {
                        e.currentTarget.src = '/assets/images/image_error.png';
                      }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className={styles["divider"]} />

            <div className={styles["detail-section"]}>
              <h2 className={styles["section-title"]}>상세 설명</h2>
              <p className={styles["description"]}>{travelproduct.contents}</p>
            </div>

            <div className={styles["divider"]} />

            <div className={styles["location-section"]}>
              <h2 className={styles["section-title"]}>상세 위치</h2>
              <div className={styles["map-container"]}>
                <KakaoMap
                  lat={travelproduct.travelproductAddress?.lat}
                  lng={travelproduct.travelproductAddress?.lng}
                />
              </div>
            </div>

            <div className={styles["inquiry-section"]}>
              <div className={styles["inquiry-header"]}>
                <ChatBubbleLeftIcon className={styles["icon"]} />
                <h2 className={styles["inquiry-title"]}>문의하기</h2>
              </div>
              <QuestionWrite />
              <QuestionList
                sellerId={travelproduct?.seller?._id}
                currentUserId={currentUser?._id}
              />
            </div>
          </div>

          <aside className={styles["sidebar"]}>
            <div className={styles["price-card"]}>
              <div className={styles["price-info"]}>
                <div className={styles["price"]}>
                  <span className={styles["price-amount"]}>
                    {travelproduct.price.toLocaleString()}
                  </span>
                  <span className={styles["price-unit"]}>원</span>
                </div>
                <ul className={styles["price-notice"]}>
                  <li>숙박권은 트립트립에서 포인트 충전 후 구매하실 수 있습니다.</li>
                  <li className={styles["light"]}>
                    상세 설명에 숙박권 사용기한을 꼭 확인해 주세요.
                  </li>
                </ul>
              </div>
              <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <AlertDialogTrigger asChild>
                  <Button className="blue-button-full" text="구매하기" />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>해당 숙박권을 구매 하시겠어요?</AlertDialogTitle>
                    <AlertDialogDescription>
                      해당 숙박권은 포인트로만 구매 가능합니다.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>취소</AlertDialogCancel>
                    <AlertDialogAction onClick={handlePurchase}>
                      구매
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <AlertDialog open={isInsufficientPointsModalOpen} onOpenChange={setIsInsufficientPointsModalOpen}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>포인트 부족</AlertDialogTitle>
                    <AlertDialogDescription>
                      포인트가 부족합니다.
                      <br />
                      포인트를 충전 후 구매해주세요.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>아니오</AlertDialogCancel>
                    <AlertDialogAction onClick={handleChargeFromInsufficientModal}>
                      충전
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            <div className={styles["seller-card"]}>
              <h3 className={styles["seller-title"]}>판매자</h3>
              <div className={styles["seller-profile"]}>
                <img
                  src={travelproduct.seller?.picture ? `https://storage.googleapis.com/${travelproduct.seller.picture}` : "/assets/images/profilephoto.jpg"}
                  alt={travelproduct.seller?.name || "판매자"}
                  className={styles["profile-image"]}
                  onError={(e) => {
                    e.currentTarget.src = '/assets/images/profilephoto.jpg';
                  }}
                />
                <span className={styles["seller-name"]}>
                  {travelproduct.seller?.name || "판매자 정보 없음"}
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
