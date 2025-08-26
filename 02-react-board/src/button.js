// button.js
const 버튼 = (props) => {
    const buttonClass = `button ${props.className || 'white-button'}`;
    
    return (
        <button
            className={buttonClass}
            onClick={props.onClick} // 이 부분을 추가하여 props로 받은 onClick 함수를 적용합니다.
        >
            {props.icon && (
                <span className="button-icon" style={{fill: props.iconColor}}>
                    <img src={props.icon} alt="icon" />
                </span>
            )}
            {props.text}
        </button>
    );
};

export default 버튼