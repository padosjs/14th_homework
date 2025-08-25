const 인풋필드 = (props) => {
    // isTextArea props가 true이면 textarea를, 아니면 input을 렌더링합니다.
    const 필드 = props.isTextArea ? (
        <textarea 
            className="input-text" 
            placeholder={props.플레이스홀더텍스트} 
            rows={props.rows || 5} // 기본 행 수를 5로 설정 (props로 덮어쓸 수 있음)
        />
    ) : (
        <input 
            className="input-text" 
            type="text" 
            placeholder={props.플레이스홀더텍스트} 
        />
    );

    return (
        <div className="input-container">
            <div className="input-title-container">
                <h4 className="input-title">{props.인풋필드제목}</h4>
                {/* isRequired props가 true일 때만 별표를 렌더링합니다. */}
                {props.isRequired && <h4 className="input-title-asterisk">*</h4>} 
            </div>
            {필드}
        </div>
    );
};