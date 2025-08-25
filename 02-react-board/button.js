const 버튼 = (props) => {
    const buttonClass = `button ${props.className || 'white-button'}`;
    
    return (
        <button className={buttonClass}>
            {props.icon && (
                <span className="button-icon" style={{fill: props.iconColor}}>
                    <img src={props.icon} alt="icon" />
                </span>
            )}
            {props.text}
        </button>
    );
};