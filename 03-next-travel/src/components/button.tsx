interface ButtonProps {
    /** 추가적인 CSS 클래스를 지정합니다. (예: 'black-button', 'red-button') */
    className?: string;
    /** 버튼 클릭 시 실행될 함수입니다. */
    onClick?: () => void;
    /** 버튼의 활성화/비활성화 상태를 지정합니다. 'true'일 경우 비활성화됩니다. */
    disabled?: boolean;
    /** 버튼에 표시될 아이콘 이미지의 경로입니다. */
    icon?: string;
    /** 버튼에 표시될 텍스트입니다. */
    text?: string;
}

const Button = (props: ButtonProps) => {
    // className props가 제공되면 해당 클래스를 사용하고, 그렇지 않으면 'white-button'을 기본값으로 설정합니다.
    const buttonClass = `button ${props.className || 'white-button'}`;

    return (
        <button
            className={buttonClass}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {/* icon props가 있을 때만 아이콘 이미지를 렌더링합니다. */}
            {props.icon && (
                <span className="button-icon">
                    <img src={props.icon} alt="icon" />
                </span>
            )}
            {/* text props가 있을 때만 텍스트를 렌더링합니다. */}
            {props.text}
        </button>
    );
};

export default Button;