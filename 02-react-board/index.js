const 게시글등록페이지 = () => {
    return (
        <div className="main-content">
            <div className="page-container">
                <h1 className="page-title">게시물 등록</h1>
                <div className="input-group-column">
                    <인풋필드 인풋필드제목="작성자" 플레이스홀더텍스트="작성자명을 입력해주세요." isRequired={true} />
                    <인풋필드 인풋필드제목="비밀번호" 플레이스홀더텍스트="비밀번호를 입력해주세요." isRequired={true} />
                </div>
                <div className="input-divider"></div>
                <인풋필드 인풋필드제목="제목" 플레이스홀더텍스트="제목을 입력해주세요." isRequired={true} />
                <div className="input-divider"></div>
                <인풋필드 인풋필드제목="내용" 플레이스홀더텍스트="내용을 입력해주세요." isRequired={true} isTextArea={true} rows={13} />
                <div className="input-divider"></div>
                <div className="input-group-address">
                    <div className="input-button-group-address">
                        <인풋필드 인풋필드제목="주소" 플레이스홀더텍스트="01234" />
                        <버튼 className="white-button" text="우편번호 검색" />
                    </div>
                    <인풋필드 플레이스홀더텍스트="주소를 입력해주세요." />
                    <인풋필드 플레이스홀더텍스트="상세주소" />
                </div>
                <div className="input-divider"></div>
                <인풋필드 인풋필드제목="유튜브 링크" 플레이스홀더텍스트="링크를 입력해주세요" />
                <div className="input-divider"></div>
                <div className="button-group-image-upload">
                    <버튼 className="image-upload-button" icon="./assets/icons/outline/add.svg" text="클릭해서 사진 업로드" />
                    <버튼 className="image-upload-button" icon="./assets/icons/outline/add.svg" text="클릭해서 사진 업로드" />
                    <버튼 className="image-upload-button" icon="./assets/icons/outline/add.svg" text="클릭해서 사진 업로드" />
                </div>
                <div className="input-divider"></div>
                <div className="button-group">
                    <버튼 className="white-button" text="취소" />
                    <버튼 className="blue-button" text="등록하기" />
                </div>
            </div>
        </div>
    )
}