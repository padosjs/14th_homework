"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/commons/components/button";
import { Input } from "@/commons/components/input";
import { Emotion, getEmotionImage, getEmotionLabel, getEmotionColor } from "@/commons/constants/enum";
import styles from "./styles.module.css";

export default function DiariesDetail() {
  const [retrospectInput, setRetrospectInput] = useState("");
  
  // Mock 데이터
  const mockDiary = {
    title: "이것은 타이틀 입니다.",
    emotion: Emotion.HAPPY,
    date: "2024. 07. 12",
    content: "내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다"
  };

  const mockRetrospects = [
    { id: 1, text: "3년이 지나고 다시 보니 이때가 그립다.", date: "[2024. 09. 24]" },
    { id: 2, text: "3년이 지나고 다시 보니 이때가 그립다.", date: "[2024. 09. 24]" }
  ];

  const emotionImagePath = `/images/${getEmotionImage(mockDiary.emotion, "small").replace('.svg', '.png')}`;
  const emotionLabel = getEmotionLabel(mockDiary.emotion);
  const emotionColor = getEmotionColor(mockDiary.emotion);

  const handleCopyContent = () => {
    navigator.clipboard.writeText(mockDiary.content);
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
    <div className={styles.wrapper}>
      <div className={styles.gap1} />
      
      <div className={styles.detailTitle}>
        <div className={styles.titleSection}>
          <span className={styles.titleText}>{mockDiary.title}</span>
        </div>
        
        <div className={styles.emotionDateSection}>
          <div className={styles.emotionWrapper}>
            <Image
              src={emotionImagePath}
              alt={emotionLabel}
              width={32}
              height={32}
              className={styles.emotionIcon}
            />
            <span className={styles.emotionText} style={{ color: emotionColor }}>
              {emotionLabel}
            </span>
          </div>
          
          <div className={styles.dateWrapper}>
            <span className={styles.dateText}>{mockDiary.date}</span>
            <span className={styles.dateText}>작성</span>
          </div>
        </div>
      </div>
      
      <div className={styles.gap2} />
      
      <div className={styles.detailContent}>
        <div className={styles.contentWrapper}>
          <div className={styles.contentLabel}>내용</div>
          <div className={styles.contentText}>{mockDiary.content}</div>
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
