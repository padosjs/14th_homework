import Button from '@/components/button/button';
import useAnswerWrite from './hook';
import styles from './styles.module.css';

interface IAnswerWriteProps {
  isEdit?: boolean;
  answerId?: string;
  questionId: string;
  initialContent?: string;
  onEditComplete?: () => void;
}

export default function AnswerWrite({
  isEdit = false,
  answerId,
  questionId,
  initialContent,
  onEditComplete,
}: IAnswerWriteProps) {
  const {
    content,
    onChangeContent,
    onClickCreateAnswer,
    onClickUpdateAnswer,
    isButtonDisabled,
  } = useAnswerWrite({
    isEdit,
    answerId,
    questionId,
    initialContent,
    onEditComplete,
  });

  return (
    <div className={styles['answer-write']}>
      <textarea
        className={styles['answer-textarea']}
        placeholder="답변을 입력해 주세요."
        value={content}
        onChange={onChangeContent}
      />
      <div className={styles['button-group']}>
        <Button className="white-button" text="취소" onClick={onEditComplete} />
        <Button
          className="blue-button"
          text={isEdit ? '수정' : '답변 등록'}
          onClick={isEdit ? onClickUpdateAnswer : onClickCreateAnswer}
          disabled={isButtonDisabled}
        />
      </div>
    </div>
  );
}
