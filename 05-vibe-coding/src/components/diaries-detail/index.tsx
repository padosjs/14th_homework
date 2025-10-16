"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/commons/components/button";
import { Input } from "@/commons/components/input";
import { getEmotionImage, getEmotionLabel, getEmotionColor } from "@/commons/constants/enum";
import styles from "./styles.module.css";
import { useDiaryDetail } from "./hooks/index.binding.hook";

export default function DiariesDetail() {
  const [retrospectInput, setRetrospectInput] = useState("");
  const { diary } = useDiaryDetail();

  const mockRetrospects = [
    { id: 1, text: "3년이 지나고 다시 보니 이때가 그립다.", date: "[2024. 09. 24]" },
    { id: 2, text: "3년이 지나고 다시 보니 이때가 그립다.", date: "[2024. 09. 24]" }
  ];

  const emotionImagePath = diary ? `/images/${getEmotionImage(diary.emotion, "small").replace('.svg', '.png')}` : "";
  const emotionLabel = diary ? getEmotionLabel(diary.emotion) : "";
  const emotionColor = diary ? getEmotionColor(diary.emotion) : "";

  const handleCopyContent = () => {
    if (diary) {
      navigator.clipboard.writeText(diary.content);
    }
  };

  const handleEdit = () => {
    // 수정 기능
  };

  const handleDelete = () => {
    // 삭제 기능
  };

  const handleRetrospectSubmit = () => {
    if (retrospectInput.trim()) {
      // 회고 제출 기능
      setRetrospectInput("");
    }
  };

  return (
    <div className={styles.wrapper} data-testid="diary-detail-wrapper">
      <div className={styles.gap1} />
      
      <div className={styles.detailTitle}>
        <div className={styles.titleSection}>
          <span className={styles.titleText} data-testid="diary-detail-title">{diary?.title || ""}</span>
        </div>
        
        <div className={styles.emotionDateSection}>
          <div className={styles.emotionWrapper}>
            {diary && (
              <>
                <Image
                  src={emotionImagePath}
                  alt={emotionLabel}
                  width={32}
                  height={32}
                  className={styles.emotionIcon}
                />
                <span className={styles.emotionText} style={{ color: emotionColor }} data-testid="diary-detail-emotion-text">
                  {emotionLabel}
                </span>
              </>
            )}
          </div>
          
          <div className={styles.dateWrapper}>
            <span className={styles.dateText} data-testid="diary-detail-date">{diary?.createdAt || ""}</span>
            {diary && <span className={styles.dateText}>작성</span>}
          </div>
        </div>
      </div>
      
      <div className={styles.gap2} />
      
      <div className={styles.detailContent}>
        <div className={styles.contentWrapper}>
          <div className={styles.contentLabel}>내용</div>
          <div className={styles.contentText} data-testid="diary-detail-content">{diary?.content || ""}</div>
        </div>
        
        <div className={styles.copyWrapper}>
          <button className={styles.copyButton} onClick={handleCopyContent}>
            <Image
              src="/icons/copy_outline_light_m.svg"
              alt="복사"
              width={24}
              height={24}
              className={styles.copyIcon}
            />
            <span className={styles.copyText}>내용 복사</span>
          </button>
        </div>
      </div>
      
      <div className={styles.gap3} />
      
      <div className={styles.detailFooter}>
        <div className={styles.footerButtons}>
          <Button
            variant="secondary"
            size="medium"
            theme="light"
            onClick={handleEdit}
            style={{ width: "51px" }}
          >
            수정
          </Button>
          <Button
            variant="secondary"
            size="medium"
            theme="light"
            onClick={handleDelete}
            style={{ width: "51px" }}
          >
            삭제
          </Button>
        </div>
      </div>
      
      <div className={styles.gap4} />
      
      <div className={styles.retrospectInput}>
        <div className={styles.retrospectLabel}>회고</div>
        <div className={styles.retrospectInputWrapper}>
          <div className={styles.retrospectInputField}>
            <Input
              variant="primary"
              size="medium"
              theme="light"
              placeholder="회고를 남겨보세요."
              value={retrospectInput}
              onChange={(e) => setRetrospectInput(e.target.value)}
            />
          </div>
          <Button
            variant="primary"
            size="medium"
            theme="dark"
            onClick={handleRetrospectSubmit}
            className={styles.retrospectSubmitButton}
          >
            입력
          </Button>
        </div>
      </div>
      
      <div className={styles.gap5} />
      
      <div className={styles.retrospectList}>
        {mockRetrospects.map((retrospect) => (
          <div key={retrospect.id} className={styles.retrospectItem}>
            <span className={styles.retrospectText}>{retrospect.text}</span>
            <span className={styles.retrospectDate}>{retrospect.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
