import { useState, ChangeEvent } from 'react';
import '../../../App.css';

import InputField from '../../../input';
import Button from '../../../button';

const BoardsNew = () => {
    const [author, setAuthor] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");

    const [authorError, setAuthorError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [titleError, setTitleError] = useState<boolean>(false);
    const [contentError, setContentError] = useState<boolean>(false);

    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

    const onChangeAuthor = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setAuthor(event.target.value);
        checkFormValidity(event.target.value, password, title, content);
    };
    const onChangePassword = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setPassword(event.target.value);
        checkFormValidity(author, event.target.value, title, content);
    };
    const onChangeTitle = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setTitle(event.target.value);
        checkFormValidity(author, password, event.target.value, content);
    };
    const onChangeContent = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setContent(event.target.value);
        checkFormValidity(author, password, title, event.target.value);
    };

    const checkFormValidity = (author: string, password: string, title: string, content: string): void => {
        if (author && password && title && content) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    };

    const onClickSignup = (): void => {
        setAuthorError(false);
        setPasswordError(false);
        setTitleError(false);
        setContentError(false);

        let isValid: boolean = true;

        if (author === "") {
            setAuthorError(true);
            isValid = false;
        }
        if (password === "") {
            setPasswordError(true);
            isValid = false;
        }
        if (title === "") {
            setTitleError(true);
            isValid = false;
        }
        if (content === "") {
            setContentError(true);
            isValid = false;
        }
        if (!isValid) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            alert("게시글 등록이 가능한 상태입니다!");
        }
    };

    return (
        <div className="main-content">
            <div className="page-container">
                <h1 className="page-title">게시물 등록</h1>
                <div className="input-group-column">
                    <InputField
                        title="작성자"
                        placeholderText="작성자명을 입력해주세요."
                        isRequired={true}
                        onChange={onChangeAuthor}
                        value={author}
                        hasError={authorError}
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
                <div className="divider"></div>
                <InputField
                    title="제목"
                    placeholderText="제목을 입력해주세요."
                    isRequired={true}
                    onChange={onChangeTitle}
                    value={title}
                    hasError={titleError}
                    errorMessage="필수 입력 사항입니다."
                />
                <div className="divider"></div>
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
                <div className="divider"></div>
                <div className="input-group-address">
                    <div className="input-button-group-address">
                        <InputField placeholderText="01234" />
                        <Button className="white-button" text="우편번호 검색" onClick={() => {}} />
                    </div>
                    <InputField placeholderText="주소를 입력해주세요." />
                    <InputField placeholderText="상세주소" />
                </div>
                <div className="divider"></div>
                <InputField title="유튜브 링크" placeholderText="링크를 입력해주세요" />
                <div className="divider"></div>
                <div className="button-group-image-upload">
                    <Button className="image-upload-button" icon="/assets/icons/outline/add.svg" text="클릭해서 사진 업로드" onClick={() => {}} />
                    <Button className="image-upload-button" icon="/assets/icons/outline/add.svg" text="클릭해서 사진 업로드" onClick={() => {}} />
                    <Button className="image-upload-button" icon="/assets/icons/outline/add.svg" text="클릭해서 사진 업로드" onClick={() => {}} />
                </div>
                <div className="divider"></div>
                <div className="button-group">
                    <Button className="white-button" text="취소" onClick={() => {}} />
                    <Button className="blue-button" text="등록" onClick={onClickSignup} disabled={isButtonDisabled} />
                </div>
            </div>
        </div>
    );
}

export default BoardsNew;