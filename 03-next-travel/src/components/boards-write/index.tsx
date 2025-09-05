"use client";

import { useState, ChangeEvent, useEffect } from 'react';
import { gql, useMutation, useQuery } from "@apollo/client"
import { useRouter, useParams } from 'next/navigation';
import InputField from '@/components/input/input'
import Button from '@/components/button/button';
import styles from './styles.module.css';

// 신규 등록을 위한 API 정의
const CREATE_BOARD = gql`
    mutation createBoard($createBoardInput: CreateBoardInput!) {
            createBoard(createBoardInput: $createBoardInput){
            _id
        }
    }
`
const FETCH_BOARDS = gql`
    query {
        fetchBoards(page: 1) {
            _id
            writer
            title
            createdAt
        }
    }
`
// 기존 내용 수정을 위한 API 정의
const UPDATE_BOARD = gql`
   mutation updateBoard($updateBoardInput: UpdateBoardInput!, $password: String, $boardId: ID!) {
        updateBoard(
            updateBoardInput: $updateBoardInput
            password: $password,
            boardId: $boardId
        ) {
            _id
        }
    }
`
const FETCH_BOARD = gql`
    query fetchBoard($boardId: ID!){
        fetchBoard(boardId: $boardId){
            writer
            title
            contents
        }
    }
`

export default function BoardsWrite(props) {
    const router = useRouter()
    const addressparams = useParams()

    const [createBoard] = useMutation(CREATE_BOARD)
    const [updateBoard] = useMutation(UPDATE_BOARD)

    // 수정 모드를 위한 Fetch
    const { data } = useQuery(FETCH_BOARD, {
        variables: {
            boardId: addressparams.boardId
        },
        skip: !props.isEdit
    });

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
        // 수정 모드일 때는 writer와 password를 검사하지 않음
        if (props.isEdit) {
            if (title && content) {
                setIsButtonDisabled(false);
            } else {
                setIsButtonDisabled(true);
            }
        } else {
            // 신규 등록 모드일 때는 모든 필드 검사
            if (writer && password && title && content) {
                setIsButtonDisabled(false);
            } else {
                setIsButtonDisabled(true);
            }
        }
    };

    useEffect(() => {
        if (props.isEdit && data?.fetchBoard) {
            // 1. useQuery로 가져온 데이터를 state에 할당
            setTitle(data.fetchBoard.title);
            setContent(data.fetchBoard.contents);
            // 2. 데이터가 채워진 후 checkFormValidity 함수를 호출하여 버튼 활성화
            checkFormValidity(writer, password, data.fetchBoard.title, data.fetchBoard.contents);
        }
    }, [props.isEdit, data]); // isEdit props와 data가 변경될 때마다 실행

    // 신규 등록 기능
    const onClickSubmit = async () => {
        try {
            const result = await createBoard({
                variables: {
                    createBoardInput: {
                        writer: writer,
                        password: password,
                        title: title,
                        contents: content
                    }
                },
                refetchQueries: [{ query: FETCH_BOARDS }]
            })
            router.push(`/boards/${result.data.createBoard._id}`)
        } catch (error) { alert("에러가 발생하였습니다.") }
    }
    // 기존 내용 수정 기능 
    const onClickUpdate = async () => {
        try {
            const password = window.prompt("글을 작성할 때 입력하셨던 비밀번호를 입력해 주세요.");
            if (password === null) {
                return;
            }
            const result = await updateBoard({
                variables: {
                    updateBoardInput: {
                        title: title,
                        contents: content
                    },
                    password: password,
                    boardId: addressparams.boardId
                },
                refetchQueries: [
                    { query: FETCH_BOARD, variables: { boardId: addressparams.boardId } },
                    { query: FETCH_BOARDS } // 이게 없으면 수정 후 들어가는 상세페이지 안의 '목록으로' 버튼 눌러서 이동했을 때 수정 사항이 바로 안 보임
                ]
            })
            router.push(`/boards/${result.data.updateBoard._id}`);
        } catch (error) {
            // 서버에서 받은 에러 메시지
            const errorMessage = error.graphQLErrors[0]?.message;
            // 에러 메시지가 있다면 해당 메시지를 alert 창으로 띄우고
            if (errorMessage) {
                alert(errorMessage);
            } else {
                // 에러 메시지가 없을 경우를 대비하여 일반적인 메시지 표시
                alert("에러가 발생했습니다.");
            }
        }
    };

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
                        value={props.isEdit ? data?.fetchBoard?.writer || "" : writer}
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