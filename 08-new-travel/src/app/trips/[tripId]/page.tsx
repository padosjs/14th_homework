"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "@apollo/client";
import { ChatBubbleLeftIcon, BookmarkIcon, MapPinIcon, LinkIcon, TrashIcon } from "@heroicons/react/24/outline";
import Button from "@/components/button/button";
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
import { FETCH_TRAVELPRODUCTS } from "../queries";
import styles from "./styles.module.css";

export default function TripDetailPage() {
  const params = useParams();
  const router = useRouter();
  const tripId = params.tripId as string;
  const { data, loading, error } = useQuery(FETCH_TRAVELPRODUCT, {
    variables: { travelproductId: tripId },
  });

  const [deleteTravelproduct] = useMutation(DELETE_TRAVELPRODUCT);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInsufficientPointsModalOpen, setIsInsufficientPointsModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const { points, openChargeModal } = useUserPointsStore();

  const travelproduct = data?.fetchTravelproduct;

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
              <div className={styles["main-image"]}>
                <img
                  src={travelproduct.images?.[0] ? `https://storage.googleapis.com/${travelproduct.images[0]}` : "/assets/images/image_error.png"}
                  alt="숙소 메인 이미지"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/images/image_error.png';
                  }}
                />
              </div>
              <div className={styles["thumbnail-list"]}>
                {travelproduct.images?.map((image: string, index: number) => (
                  <div
                    key={index}
                    className={styles["thumbnail"]}
                    style={{ opacity: index === 0 ? 1 : 0.5 }}
                  >
                    <img
                      src={`https://storage.googleapis.com/${image}`}
                      alt={`숙소 이미지 ${index + 1}`}
                      onError={(e) => {
                        e.currentTarget.src = '/assets/images/image_error.png';
                      }}
                    />
                  </div>
                ))}
                <div className={styles["thumbnail-gradient"]} />
              </div>
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
                <img src="/assets/images/mapsample.png" alt="상세 위치 지도" />
              </div>
            </div>

            <div className={styles["inquiry-section"]}>
              <div className={styles["inquiry-header"]}>
                <ChatBubbleLeftIcon className={styles["icon"]} />
                <h2 className={styles["inquiry-title"]}>문의하기</h2>
              </div>
              <div className={styles["inquiry-form"]}>
                <div className={styles["textarea-wrapper"]}>
                  <textarea
                    className={styles["inquiry-textarea"]}
                    placeholder="문의사항을 입력해 주세요."
                    maxLength={100}
                  />
                  <div className={styles["char-count"]}>0/100</div>
                </div>
                <Button className="black-button" text="문의 하기" />
              </div>
              <p className={styles["empty-message"]}>
                등록된 문의사항이 없습니다.
              </p>
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
