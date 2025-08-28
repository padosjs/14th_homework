interface ButtonProps {
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    icon?: string;
    iconColor?: string;
    text?: string;
}

const Button = (props: ButtonProps) => {
    const buttonClass = `button ${props.className || 'white-button'}`;

    return (
        <button
            className={buttonClass}
            onClick={props.onClick}
            disabled={props.disabled}
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

export default Button;