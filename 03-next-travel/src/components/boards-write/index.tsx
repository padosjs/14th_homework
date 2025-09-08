"use client";

import useBoardsWrite from './hook';
import InputField from '@/components/input/input'
import Button from '@/components/button/button';
import styles from './styles.module.css';
import { IBoardsWriteProps, Board } from "./types"


export default function BoardsWrite(props: IBoardsWriteProps) {
    const {
        onChangeWriter,
        onChangePassword,
        onChangeTitle,
        onChangeContent,
        onClickSubmit,
        onClickUpdate,
        writer,
        password,
        title,
        content,
        writerError,
        passwordError,
        titleError,
        contentError,
        isButtonDisabled,
        data
    } = useBoardsWrite(props)

    const boardData = data?.fetchBoard as Board | undefined;

    return (
        <div className={styles['main-content']}>
            <div className={styles['page-container']}>
                <h1 className={styles['page-title']}>게시물 {props.isEdit ? "수정" : "등록"}</h1>
                <div className={styles['input-group-column']}>
                    <InputField
                        title="작성자"
                        placeholderText="작성자명을 입력해주세요."
                        isRequired={true}
                        onChange={onChangeWriter}
                        value={props.isEdit ? boardData?.writer || "" : writer}
                        hasError={writerError}
                        errorMessage="필수 입력 사항입니다."
                        disabled={props.isEdit}
                    />
                    <InputField
                        title="비밀번호"
                        placeholderText="비밀번호를 입력해주세요."
                        isRequired={true}
                        onChange={onChangePassword}
                        value={props.isEdit ? "******" : password}
                        hasError={passwordError}
                        errorMessage="필수 입력 사항입니다."
                        disabled={props.isEdit}
                    />
                </div>
                <div className={styles['divider']}></div>
                <InputField
                    title="제목"
                    placeholderText="제목을 입력해주세요."
                    isRequired={true}
                    onChange={onChangeTitle}
                    value={title}
                    hasError={titleError}
                    errorMessage="필수 입력 사항입니다."
                />
                <div className={styles['divider']}></div>
                <InputField
                    title="내용"
                    placeholderText="내용을 입력해주세요."
                    isRequired={true}
                    isTextArea={true}
                    rows={13}
                    onChange={onChangeContent}
                    value={content}
                    hasError={contentError}
                    errorMessage="필수 입력 사항입니다."
                />
                <div className={styles['divider']}></div>
                <div className={styles['input-group-address']}>
                    <div className={styles['input-button-group-address']}>
                        <InputField placeholderText="01234" />
                        <Button className="white-button" text="우편번호 검색" onClick={() => { }} />
                    </div>
                    <InputField placeholderText="주소를 입력해주세요." />
                    <InputField placeholderText="상세주소" />
                </div>
                <div className={styles['divider']}></div>
                <InputField title="유튜브 링크" placeholderText="링크를 입력해주세요" />
                <div className={styles['divider']}></div>
                <div className={styles['button-group-image-upload']}>
                    <Button className="image-upload-button" icon="/assets/icons/outline/add.svg" text="클릭해서 사진 업로드" onClick={() => { }} />
                    <Button className="image-upload-button" icon="/assets/icons/outline/add.svg" text="클릭해서 사진 업로드" onClick={() => { }} />
                    <Button className="image-upload-button" icon="/assets/icons/outline/add.svg" text="클릭해서 사진 업로드" onClick={() => { }} />
                </div>
                <div className={styles['divider']}></div>
                <div className={styles['button-group']}>
                    <Button className="white-button" text="취소" onClick={() => { }} />
                    <Button className="blue-button" text={props.isEdit ? "수정" : "등록"} onClick={props.isEdit ? onClickUpdate : onClickSubmit} disabled={isButtonDisabled} />
                </div>
            </div>
        </div>
    );
}