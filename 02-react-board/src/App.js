import { useState } from 'react';
import './App.css';
import 인풋필드 from './input.js';
import 버튼 from './button.js';

const App = () => {
    const [author, setAuthor] = useState("");
    const [password, setPassword] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [authorError, setAuthorError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [titleError, setTitleError] = useState(false);
    const [contentError, setContentError] = useState(false);

    const onChangeAuthor = (event) => {
        setAuthor(event.target.value);
    };

    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const onChangeTitle = (event) => {
        setTitle(event.target.value);
    };

    const onChangeContent = (event) => {
        setContent(event.target.value);
    };

    const onClickSignup = (event) => {
        // 모든 에러 상태를 우선 false로 초기화
        setAuthorError(false);
        setPasswordError(false);
        setTitleError(false);
        setContentError(false);

        let isValid = true;

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

        // 유효성 검사 실패 시 스크롤을 최상단으로 이동
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
                    <인풋필드
                        인풋필드제목="작성자"
                        플레이스홀더텍스트="작성자명을 입력해주세요."
                        isRequired={true}
                        onChange={onChangeAuthor}
                        value={author}
                        hasError={authorError === true}
                        errorMessage="필수 입력 사항입니다."
                    />
                    <인풋필드
                        인풋필드제목="비밀번호"
                        플레이스홀더텍스트="비밀번호를 입력해주세요."
                        isRequired={true}
                        onChange={onChangePassword}
                        value={password}
                        hasError={passwordError === true}
                        errorMessage="필수 입력 사항입니다."
                    />
                </div>
                <div className="input-divider"></div>
                <인풋필드
                    인풋필드제목="제목"
                    플레이스홀더텍스트="제목을 입력해주세요."
                    isRequired={true}
                    onChange={onChangeTitle}
                    value={title}
                    hasError={titleError === true}
                    errorMessage="필수 입력 사항입니다."
                />
                <div className="input-divider"></div>
                <인풋필드
                    인풋필드제목="내용"
                    플레이스홀더텍스트="내용을 입력해주세요."
                    isRequired={true}
                    isTextArea={true}
                    rows={13}
                    onChange={onChangeContent}
                    value={content}
                    hasError={contentError === true}
                    errorMessage="필수 입력 사항입니다."
                />
                <div className="input-divider"></div>
                <div className="input-group-address">
                    <div className="input-button-group-address">
                        <인풋필드 플레이스홀더텍스트="01234" />
                        <버튼 className="white-button" text="우편번호 검색" />
                    </div>
                    <인풋필드 플레이스홀더텍스트="주소를 입력해주세요." />
                    <인풋필드 플레이스홀더텍스트="상세주소" />
                </div>
                <div className="input-divider"></div>
                <인풋필드 인풋필드제목="유튜브 링크" 플레이스홀더텍스트="링크를 입력해주세요" />
                <div className="input-divider"></div>
                <div className="button-group-image-upload">
                    <버튼 className="image-upload-button" icon="/assets/icons/outline/add.svg" text="클릭해서 사진 업로드" />
                    <버튼 className="image-upload-button" icon="/assets/icons/outline/add.svg" text="클릭해서 사진 업로드" />
                    <버튼 className="image-upload-button" icon="/assets/icons/outline/add.svg" text="클릭해서 사진 업로드" />
                </div>
                <div className="input-divider"></div>
                <div className="button-group">
                    <버튼 className="white-button" text="취소" />
                    <버튼 className="blue-button" text="등록" onClick={onClickSignup} />
                </div>
            </div>
        </div>
    );
}

export default App;