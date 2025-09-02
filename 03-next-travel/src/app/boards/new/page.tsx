"use client";

import { useState, ChangeEvent } from 'react';
import { gql, useMutation } from "@apollo/client"
import InputField from '@/components/input'
import Button from '@/components/button';
import styles from './styles.module.css';

const CREATE_BOARD = gql`
    mutation createBoard($createBoardInput: CreateBoardInput!) {
            createBoard(createBoardInput: $createBoardInput){
            _id
        }
    }
`

export default function BoardsNew() {

    const [writer, setWriter] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");

    const [writerError, setWriterError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [titleError, setTitleError] = useState<boolean>(false);
    const [contentError, setContentError] = useState<boolean>(false);

    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

    const onChangeWriter = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setWriter(event.target.value);
        checkFormValidity(event.target.value, password, title, content);
    };
    const onChangePassword = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setPassword(event.target.value);
        checkFormValidity(writer, event.target.value, title, content);
    };
    const onChangeTitle = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setTitle(event.target.value);
        checkFormValidity(writer, password, event.target.value, content);
    };
    const onChangeContent = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setContent(event.target.value);
        checkFormValidity(writer, password, title, event.target.value);
    };

    const checkFormValidity = (writer: string, password: string, title: string, content: string): void => {
        if (writer && password && title && content) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    };

    // 이전 과제를 위한 alert 창, 현재는 버튼 활성화/비활성화로 대응
    // const onClickSignup = (): void => {
    //     setWriterError(false);
    //     setPasswordError(false);
    //     setTitleError(false);
    //     setContentError(false);

    //     let isValid: boolean = true;

    //     if (writer === "") {
    //         setWriterError(true);
    //         isValid = false;
    //     }
    //     if (password === "") {
    //         setPasswordError(true);
    //         isValid = false;
    //     }
    //     if (title === "") {
    //         setTitleError(true);
    //         isValid = false;
    //     }
    //     if (content === "") {
    //         setContentError(true);
    //         isValid = false;
    //     }
    //     if (!isValid) {
    //         window.scrollTo({ top: 0, behavior: 'smooth' });
    //     } else {
    //         alert("게시글 등록이 가능한 상태입니다!");
    //     }
    // };


    const [createBoard] = useMutation(CREATE_BOARD)

    const onClickSubmit = async () => {
        const result = await createBoard({
            variables: {
                createBoardInput: {
                    writer: writer,
                    password: password,
                    title: title,
                    contents: content
                }
            }
        })
        console.log(result)
    }

    return (
        <div className={styles['main-content']}>
            <div className={styles['page-container']}>
                <h1 className={styles['page-title']}>게시물 등록</h1>
                <div className="input-group-column">
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
                <div className="input-group-address">
                    <div className="input-button-group-address">
                        <InputField placeholderText="01234" />
                        <Button className="white-button" text="우편번호 검색" onClick={() => { }} />
                    </div>
                    <InputField placeholderText="주소를 입력해주세요." />
                    <InputField placeholderText="상세주소" />
                </div>
                <div className={styles['divider']}></div>
                <InputField title="유튜브 링크" placeholderText="링크를 입력해주세요" />
                <div className={styles['divider']}></div>
                <div className="button-group-image-upload">
                    <Button className="image-upload-button" icon="/assets/icons/outline/add.svg" text="클릭해서 사진 업로드" onClick={() => { }} />
                    <Button className="image-upload-button" icon="/assets/icons/outline/add.svg" text="클릭해서 사진 업로드" onClick={() => { }} />
                    <Button className="image-upload-button" icon="/assets/icons/outline/add.svg" text="클릭해서 사진 업로드" onClick={() => { }} />
                </div>
                <div className={styles['divider']}></div>
                <div className="button-group">
                    <Button className="white-button" text="취소" onClick={() => { }} />
                    <Button className="blue-button" text="등록" onClick={onClickSubmit} disabled={isButtonDisabled} />
                </div>
            </div>
        </div>
    );
}