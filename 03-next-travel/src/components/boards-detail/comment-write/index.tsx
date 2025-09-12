import styles from './styles.module.css'
import InputField from '@/components/input/input'
import Button from '@/components/button/button';
import useCommentWrite from "./hook";
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline'

export default function CommentWrite() {

    const {
        onChangeWriter,
        onChangePassword,
        onChangeContent,
        onClickCreateComment,
        writer,
        password,
        content,
        writerError,
        passwordError,
        contentError,
        isButtonDisabled,
    } = useCommentWrite()

    return (
        <div className={styles['main-container']}>
            <h4 className={styles['page-title']}>
                <ChatBubbleLeftIcon className={styles['comment-header']} />댓글
            </h4>
            <div className={styles['rating-group']}>
                <img src="/assets/icons/filled/star.svg" />
                <img src="/assets/icons/filled/star.svg" />
                <img src="/assets/icons/filled/star.svg" />
                <img src="/assets/icons/filled/star.svg" />
                <img src="/assets/icons/filled/star.svg" />
            </div>
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
                    />
                    <InputField
                        title="비밀번호"
                        placeholderText="비밀번호를 입력해주세요."
                        isRequired={true}
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
                    errorMessage="필수 입력 사항입니다." />
                <div className={styles['button-container']}>
                    <Button className="blue-button" text={"댓글 등록"} onClick={onClickCreateComment}
                        disabled={isButtonDisabled} />
                </div>
            </div>
        </div >
    )
}