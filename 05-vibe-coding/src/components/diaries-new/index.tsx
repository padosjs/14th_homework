"use client";

import { useState } from "react";
import styles from "./styles.module.css";
import { Input } from "@/commons/components/input";
import { Button } from "@/commons/components/button";
import { Emotion, EMOTION_DATA } from "@/commons/constants/enum";
import { useModal } from "@/commons/providers/modal/modal.provider";

export default function DiariesNew() {
  const { closeModal } = useModal();
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion>(Emotion.HAPPY);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleEmotionChange = (emotion: Emotion) => {
    setSelectedEmotion(emotion);
  };

  const handleClose = () => {
    closeModal();
  };

  const handleSubmit = () => {
    // 등록하기 로직
  };

  return (
    <div className={styles.wrapper} data-testid="diary-modal">
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.headerTitle} data-testid="diary-modal-title">일기 쓰기</h1>
      </div>
      <div className={styles.gap40}></div>

      {/* Emotion Box */}
      <div className={styles.emotionBox}>
        <div className={styles.emotionTitle}>오늘 기분은 어땟나요?</div>
        <div className={styles.emotionRadioGroup}>
          {Object.entries(EMOTION_DATA).map(([key, data]) => {
            const emotion = key as Emotion;
            const isChecked = selectedEmotion === emotion;
            return (
              <label key={emotion} className={styles.radioLabel}>
                <input
                  type="radio"
                  name="emotion"
                  value={emotion}
                  checked={isChecked}
                  onChange={() => handleEmotionChange(emotion)}
                  className={styles.radioInput}
                />
                <span className={styles.radioText}>{data.label}</span>
              </label>
            );
          })}
        </div>
      </div>
      <div className={styles.gap40}></div>

      {/* Input Title */}
      <div className={styles.inputTitle}>
        <label className={styles.inputLabel}>제목</label>
        <Input
          variant="primary"
          size="medium"
          theme="light"
          placeholder="제목을 입력합니다."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.inputField}
        />
      </div>
      <div className={styles.gap24}></div>

      {/* Input Content */}
      <div className={styles.inputContent}>
        <label className={styles.inputLabel}>내용</label>
        <textarea
          placeholder="내용을 입력합니다."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={styles.textarea}
        />
      </div>
      <div className={styles.gap40}></div>

      {/* Footer */}
      <div className={styles.footer}>
        <Button
          variant="secondary"
          size="medium"
          theme="light"
          onClick={handleClose}
          className={styles.closeButton}
          data-testid="close-modal-button"
        >
          닫기
        </Button>
        <Button
          variant="primary"
          size="medium"
          theme="light"
          onClick={handleSubmit}
          className={styles.submitButton}
        >
          등록하기
        </Button>
      </div>
    </div>
  );
}

