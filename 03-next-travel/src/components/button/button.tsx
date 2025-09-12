import styles from './styles.module.css'
import { MouseEventHandler, ComponentType, SVGProps } from 'react';

interface ButtonProps {
    /** 추가적인 CSS 클래스를 지정합니다. (예: 'white-button', 'blue-button') */
    className?: string;
    /** 버튼 클릭 시 실행될 함수입니다. */
    onClick?: MouseEventHandler<HTMLButtonElement>;
    /** 버튼의 활성화/비활성화 상태를 지정합니다. 'true'일 경우 비활성화됩니다. */
    disabled?: boolean;
    /** Heroicons 아이콘 컴포넌트입니다. */
    icon?: ComponentType<SVGProps<SVGSVGElement>>;
    /** 버튼에 표시될 텍스트입니다. */
    text?: string;
    /** 아이콘의 크기를 지정합니다. (기본값: 'w-5 h-5') */
    iconSize?: string;
    /** 아이콘의 색상을 지정합니다. (예: 'red', '#ff0000') */
    iconColor?: string;
}

const Button = ({ className, onClick, disabled, icon: Icon, text, iconColor }: ButtonProps) => {
    // className prop이 제공되면 해당 클래스를 사용하고, 그렇지 않으면 'white-button'을 기본값으로 설정합니다.
    const buttonClass = `${styles.button} ${styles[className || 'white-button']}`;

    const iconStyle = iconColor ? { color: iconColor } : undefined;

    return (
        <button
            className={buttonClass}
            onClick={onClick}
            disabled={disabled}
        >
            {/* Icon prop이 있을 때만 아이콘을 렌더링합니다. */}
            {Icon && (
                <span className={styles['button-icon']}>
                    <Icon style={iconStyle} />
                </span>
            )}
            {/* text prop이 있을 때만 텍스트를 렌더링합니다. */}
            {text}
        </button>
    );
};

export default Button;