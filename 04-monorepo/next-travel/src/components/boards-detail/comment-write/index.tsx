import styles from './styles.module.css'
import { InputField, Button } from '@commons/ui';
import useCommentWrite from "./hook";
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline'
import { Rating, RatingButton } from '@/components/ui/shadcn-io/rating';

interface ICommentWriteProps {
    isEdit?: boolean;
    commentId?: string;
    initialWriter?: string;
    initialContent?: string;
    initialRating?: number;
    onEditComplete?: () => void;
}

export default function CommentWrite({ isEdit = false, commentId, initialWriter, initialContent, initialRating, onEditComplete }: ICommentWriteProps) { 

    const {
        onChangeWriter,
        onChangePassword,
        onChangeContent,
        onClickCreateComment,
        onClickUpdateComment,
        setRating,
        rating,
        writer,
        password,
        content,
        writerError,
        passwordError,
        contentError,
        isButtonDisabled,
    } = useCommentWrite({ isEdit, commentId, initialWriter, initialContent, initialRating, onEditComplete });

    return (
        <div className={styles['main-container']}>
            <h4 className={styles['page-title']}>
                <ChatBubbleLeftIcon className={styles['comment-header']} />댓글 {isEdit ? "수정" : "등록"}
            </h4>
            <Rating value={rating} onValueChange={setRating}>
                {Array.from({ length: 5 }).map((_, index) => (
                    <RatingButton key={index} size={20} className="text-yellow-500" />
                ))}
            </Rating>
            <div className={styles['comment-input-button-group']}>
                <div className={styles['input-group-column']}>
                <InputField
                        title="작성자"
                        placeholderText="작성자명을 입력해주세요."
                        isRequired={true}
                        onChange={onChangeWriter}
                        value={writer}
                        hasError={writerError}
                        errorMessage="필수 입력 사항입니다."
                        disabled={isEdit}
                    />
                    <InputField
                        title="비밀번호"
                        placeholderText="비밀번호를 입력해주세요."
                        isRequired={true}
                        type='password'
                        onChange={onChangePassword}
                        value={password}
                        hasError={passwordError}
                        errorMessage="필수 입력 사항입니다."
                    />
                </div>
                <InputField
                    placeholderText="댓글을 입력해주세요."
                    isTextArea={true}
                    onChange={onChangeContent}
                    value={content}
                    hasError={contentError}
                    errorMessage="필수 입력 사항입니다."
                />
                <div className={styles['edit-button-container']}>
                    {isEdit && (
                        <Button
                            className="white-button"
                            text="취소"
                            onClick={onEditComplete}
                        />
                    )}
                    <Button
                        className="black-button"
                        text={isEdit ? "수정 하기" : "댓글 등록"}
                        onClick={isEdit ? onClickUpdateComment : onClickCreateComment}
                        disabled={isButtonDisabled}
                    />
                </div>
            </div>
        </div >
    )
}