import Button from '@/components/button/button';
import useQuestionWrite from './hook';
import styles from './styles.module.css';

interface IQuestionWriteProps {
  isEdit?: boolean;
  questionId?: string;
  initialContent?: string;
  onEditComplete?: () => void;
}

export default function QuestionWrite({
  isEdit = false,
  questionId,
  initialContent,
  onEditComplete,
}: IQuestionWriteProps) {
  const {
    content,
    onChangeContent,
    onClickCreateQuestion,
    onClickUpdateQuestion,
    isButtonDisabled,
    charCount,
    maxChars,
  } = useQuestionWrite({
    isEdit,
    questionId,
    initialContent,
    onEditComplete,
  });

  return (
    <div className={styles['question-write']}>
      <div className={styles['textarea-wrapper']}>
        <textarea
          className={styles['inquiry-textarea']}
          placeholder="문의사항을 입력해 주세요."
          value={content}
          onChange={onChangeContent}
          maxLength={maxChars}
        />
        <div className={styles['char-count']}>
          {charCount}/{maxChars}
        </div>
      </div>
      {isEdit ? (
        <div className={styles['button-group']}>
          <Button
            className="white-button"
            text="취소"
            onClick={onEditComplete}
          />
          <Button
            className="black-button"
            text="수정"
            onClick={onClickUpdateQuestion}
            disabled={isButtonDisabled}
          />
        </div>
      ) : (
        <Button
          className="black-button"
          text="문의 하기"
          onClick={onClickCreateQuestion}
          disabled={isButtonDisabled}
        />
      )}
    </div>
  );
}
