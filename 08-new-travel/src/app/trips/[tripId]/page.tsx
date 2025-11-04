"use client";

import { ChatBubbleLeftIcon, BookmarkIcon, MapPinIcon, LinkIcon, TrashIcon } from "@heroicons/react/24/outline";
import Button from "@/components/button/button";
import styles from "./styles.module.css";

const mockTripData = {
  id: "1",
  title: "포항 : 숙박권 명이 여기에 들어갑니다",
  subtitle: "모던한 분위기의 감도높은 숙소",
  tags: ["6인 이하", "건식 사우나", "애견동반 가능"],
  price: 32500,
  bookmarkCount: 24,
  description: `살어리 살어리랏다 쳥산(靑山)애 살어리랏다 멀위랑 ᄃᆞ래랑 먹고 쳥산(靑山)애 살어리랏다 얄리얄리 얄랑셩 얄라리 얄라 우러라 우러라 새여 자고 니러 우러라 새여 널라와 시름 한 나도 자고 니러 우니로라 리얄리 얄라셩 얄라리 얄라 가던 새 가던 새 본다 믈 아래 가던 새 본다 잉무든 장글란 가지고 믈 아래 가던 새 본다 얄리얄리 얄라셩 얄라리 얄라

이링공 뎌링공 ᄒᆞ야 나즈란 디내와손뎌
오리도 가리도 업슨 바므란 ᄯᅩ 엇디 호리라
얄리얄리 얄라셩 얄라리 얄라

어듸라 더디던 돌코 누리라 마치던 돌코
믜리도 괴리도 업시 마자셔 우니노라
얄리얄리 얄라셩 얄라리 얄라

살어리 살어리랏다 바ᄅᆞ래 살어리랏다
ᄂᆞᄆᆞ자기 구조개랑 먹고 바ᄅᆞ래 살어리랏다
얄리얄리 얄라셩 얄라리 얄라

가다가 가다가 드로라 에졍지 가다가 드로라
사ᄉᆞ미 지ᇝ대예 올아셔 ᄒᆡ금(奚琴)을 혀거를 드로라
얄리얄리 얄라셩 얄라리 얄라

가다니 ᄇᆡ브른 도긔 설진 강수를 비조라
조롱곳 누로기 ᄆᆡ와 잡ᄉᆞ와니 내 엇디 ᄒᆞ리잇고
얄리얄리 얄라셩 얄라리 얄라`,
  seller: {
    name: "김상훈",
    profileImage: "/assets/images/profilephoto.jpg",
  },
  images: {
    main: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=640&h=480&fit=crop",
    thumbnails: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=180&h=136&fit=crop",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=180&h=136&fit=crop",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=180&h=136&fit=crop",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=180&h=136&fit=crop",
    ],
  },
  mapImage: "/assets/images/mapsample.png",
};

export default function TripDetailPage() {
  return (
    <div className={styles["page-container"]}>
      <div className={styles["content-wrapper"]}>
        <div className={styles["title-header"]}>
          <h1 className={styles["title"]}>{mockTripData.title}</h1>
          <div className={styles["action-icons"]}>
            <button className={styles["icon-button"]}>
              <TrashIcon className={styles["icon"]} />
            </button>
            <button className={styles["icon-button"]}>
              <LinkIcon className={styles["icon"]} />
            </button>
            <button className={styles["icon-button"]}>
              <MapPinIcon className={styles["icon"]} />
            </button>
            <div className={styles["bookmark-badge"]}>
              <BookmarkIcon className={styles["icon"]} />
              <span>{mockTripData.bookmarkCount}</span>
            </div>
          </div>
        </div>

        <div className={styles["layout-container"]}>
          <div className={styles["main-content"]}>
            <div className={styles["title-section"]}>
              <p className={styles["subtitle"]}>{mockTripData.subtitle}</p>
              <p className={styles["tags"]}>
                {mockTripData.tags.map((tag) => `#${tag}`).join(" ")}
              </p>
            </div>

          <div className={styles["image-gallery"]}>
            <div className={styles["main-image"]}>
              <img src={mockTripData.images.main} alt="숙소 메인 이미지" />
            </div>
            <div className={styles["thumbnail-list"]}>
              {mockTripData.images.thumbnails.map((thumb, index) => (
                <div
                  key={index}
                  className={styles["thumbnail"]}
                  style={{ opacity: index === 0 ? 1 : 0.5 }}
                >
                  <img src={thumb} alt={`숙소 이미지 ${index + 1}`} />
                </div>
              ))}
              <div className={styles["thumbnail-gradient"]} />
            </div>
          </div>

          <div className={styles["divider"]} />

          <div className={styles["detail-section"]}>
            <h2 className={styles["section-title"]}>상세 설명</h2>
            <p className={styles["description"]}>{mockTripData.description}</p>
          </div>

          <div className={styles["divider"]} />

          <div className={styles["location-section"]}>
            <h2 className={styles["section-title"]}>상세 위치</h2>
            <div className={styles["map-container"]}>
              <img src={mockTripData.mapImage} alt="상세 위치 지도" />
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
                  {mockTripData.price.toLocaleString()}
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
            <Button className="blue-button-full" text="구매하기" />
          </div>

          <div className={styles["seller-card"]}>
            <h3 className={styles["seller-title"]}>판매자</h3>
            <div className={styles["seller-profile"]}>
              <img
                src={mockTripData.seller.profileImage}
                alt={mockTripData.seller.name}
                className={styles["profile-image"]}
              />
              <span className={styles["seller-name"]}>
                {mockTripData.seller.name}
              </span>
            </div>
          </div>
        </aside>
        </div>
      </div>
    </div>
  );
}
