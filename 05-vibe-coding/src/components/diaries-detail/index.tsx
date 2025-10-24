"use client";

import Image from "next/image";
import { Button } from "@/commons/components/button";
import { Input } from "@/commons/components/input";
import { getEmotionImage, getEmotionLabel, getEmotionColor, Emotion } from "@/commons/constants/enum";
import styles from "./styles.module.css";
import { useDiaryDetail } from "./hooks/index.binding.hook";
import { useRetrospectForm } from "./hooks/index.retrospect.form.hook";
import { useDiaryUpdate } from "./hooks/index.update.hook";
import { useDiaryDelete } from "./hooks/index.delete.hook";

export default function DiariesDetail() {
  const { diary, retrospects } = useDiaryDetail();
  const { register, handleSubmit, isValid } = useRetrospectForm();
  const { 
    isEditing, 
    startEdit, 
    cancelEdit, 
    onSubmit: onUpdateSubmit, 
    register: updateRegister, 
    errors: updateErrors, 
    isValid: isUpdateValid 
  } = useDiaryUpdate(diary);
  
  const {
    isDeleteModalOpen,
    openDeleteModal,
    closeDeleteModal,
    deleteDiary,
  } = useDiaryDelete(diary);

  const emotionImagePath = diary ? `/images/${getEmotionImage(diary.emotion, "small").replace('.svg', '.png')}` : "";
  const emotionLabel = diary ? getEmotionLabel(diary.emotion) : "";
  const emotionColor = diary ? getEmotionColor(diary.emotion) : "";

  const handleCopyContent = () => {
    if (diary) {
      navigator.clipboard.writeText(diary.content);
    }
  };

  const handleEdit = () => {
    startEdit();
  };

  const handleDelete = () => {
    openDeleteModal();
  };

  return (
    <div className={styles.wrapper} data-testid="diary-detail-wrapper">
      <div className={styles.gap1} />
      
      {isEditing ? (
        <form onSubmit={onUpdateSubmit}>
          <div className={styles.detailTitle}>
            <div className={styles.titleSection}>
              <Input
                variant="primary"
                size="medium"
                theme="light"
                placeholder="제목을 입력하세요"
                {...updateRegister("title")}
                data-testid="diary-edit-title"
              />
              {updateErrors.title && (
                <span className={styles.errorText}>{updateErrors.title.message}</span>
              )}
            </div>
            
            <div className={styles.emotionDateSection}>
              <div className={styles.emotionWrapper}>
                <select
                  {...updateRegister("emotion")}
                  className={styles.emotionSelect}
                  data-testid="diary-edit-emotion"
                >
                  {Object.values(Emotion).map((emotion) => (
                    <option key={emotion} value={emotion}>
                      {getEmotionLabel(emotion)}
                    </option>
                  ))}
                </select>
                {updateErrors.emotion && (
                  <span className={styles.errorText}>{updateErrors.emotion.message}</span>
                )}
              </div>
              
              <div className={styles.dateWrapper}>
                <span className={styles.dateText} data-testid="diary-detail-date">{diary?.createdAt || ""}</span>
                {diary && <span className={styles.dateText}>작성</span>}
              </div>
            </div>
          </div>
        </form>
      ) : (
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
      )}
      
      <div className={styles.gap2} />
      
      {isEditing ? (
        <div className={styles.detailContent}>
          <div className={styles.contentWrapper}>
            <div className={styles.contentLabel}>내용</div>
            <textarea
              {...updateRegister("content")}
              className={styles.contentTextarea}
              placeholder="내용을 입력하세요"
              data-testid="diary-edit-content"
            />
            {updateErrors.content && (
              <span className={styles.errorText}>{updateErrors.content.message}</span>
            )}
          </div>
        </div>
      ) : (
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
      )}
      
      <div className={styles.gap3} />
      
      <div className={styles.detailFooter}>
        <div className={styles.footerButtons}>
          {isEditing ? (
            <>
              <Button
                variant="secondary"
                size="medium"
                theme="light"
                onClick={cancelEdit}
                style={{ width: "51px" }}
                data-testid="diary-edit-cancel"
              >
                취소
              </Button>
              <Button
                variant="primary"
                size="medium"
                theme="dark"
                onClick={onUpdateSubmit}
                disabled={!isUpdateValid}
                style={{ width: "51px" }}
                data-testid="diary-edit-submit"
              >
                수정
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="secondary"
                size="medium"
                theme="light"
                onClick={handleEdit}
                style={{ width: "51px" }}
                data-testid="diary-edit-button"
              >
                수정
              </Button>
              <Button
                variant="secondary"
                size="medium"
                theme="light"
                onClick={handleDelete}
                style={{ width: "51px" }}
                data-testid="diary-delete-button"
              >
                삭제
              </Button>
            </>
          )}
        </div>
      </div>
      
      <div className={styles.gap4} />
      
      <div className={styles.retrospectInput}>
        <div className={styles.retrospectLabel}>회고</div>
        <form onSubmit={handleSubmit}>
          <div className={styles.retrospectInputWrapper}>
            <div className={styles.retrospectInputField}>
              <Input
                variant="primary"
                size="medium"
                theme="light"
                placeholder="회고를 남겨보세요."
                {...register("content")}
                disabled={isEditing}
                data-testid="retrospect-input"
              />
            </div>
            <Button
              variant="primary"
              size="medium"
              theme="dark"
              type="submit"
              disabled={!isValid || isEditing}
              className={styles.retrospectSubmitButton}
              data-testid="retrospect-submit-button"
            >
              입력
            </Button>
          </div>
        </form>
      </div>
      
      <div className={styles.gap5} />
      
      <div className={styles.retrospectList}>
        {retrospects.map((retrospect) => (
          <div key={retrospect.id} className={styles.retrospectItem} data-testid="retrospect-item">
            <span className={styles.retrospectText} data-testid="retrospect-content">{retrospect.content}</span>
            <span className={styles.retrospectDate} data-testid="retrospect-date">[{retrospect.createdAt}]</span>
          </div>
        ))}
      </div>
      
      {/* 삭제 모달 */}
      {isDeleteModalOpen && (
        <div className={styles.deleteModalOverlay} data-testid="delete-modal">
          <div className={styles.deleteModal}>
            <div className={styles.deleteModalHeader}>
              <div className={styles.deleteModalTitle} data-testid="delete-modal-title">
                일기 삭제
              </div>
              <div className={styles.deleteModalMessage} data-testid="delete-modal-message">
                일기를 삭제 하시겠어요?
              </div>
            </div>
            <div className={styles.deleteModalButtons}>
              <button
                className={styles.deleteModalCancelButton}
                onClick={closeDeleteModal}
                data-testid="delete-modal-cancel"
              >
                <span className={styles.deleteModalCancelText}>취소</span>
              </button>
              <button
                className={styles.deleteModalDeleteButton}
                onClick={deleteDiary}
                data-testid="delete-modal-delete"
              >
                <span className={styles.deleteModalDeleteText}>삭제</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
