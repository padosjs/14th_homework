"use client"

import styles from './styles.module.css'
import { MouseEventHandler, ComponentType, SVGProps, ReactNode } from 'react'; // ReactNode 추가
import { useRouter } from 'next/navigation';

interface ButtonProps {
    /** 추가적인 CSS 클래스를 지정합니다. (예: 'white-button', 'blue-button') */
    className?: string;
    /** 버튼 클릭 시 실행될 함수입니다. */
    onClick?: MouseEventHandler<HTMLButtonElement>;
    /** 버튼의 활성화/비활성화 상태를 지정합니다. 'true'일 경우 비활성화됩니다. */
    disabled?: boolean;
    /** Heroicons 아이콘 컴포넌트입니다. */
    icon?: ComponentType<SVGProps<SVGSVGElement>>;
    /** 버튼에 표시될 텍스트입니다. (children이 없을 때 사용) */
    text?: string; 
    /** 아이콘의 크기를 지정합니다. (기본값: 'w-5 h-5') */
    iconSize?: string;
    /** 아이콘의 색상을 지정합니다. (예: 'red', '#ff0000') */
    iconColor?: string;
    /** 버튼 클릭 시 이동할 경로를 지정합니다. */
    path?: string;
    /** 버튼 내부에 렌더링될 요소입니다. */
    children?: ReactNode; // ✨ 추가된 부분
}

// children을 prop으로 받습니다.
const Button = ({ className, onClick, disabled, icon: Icon, text, iconColor, path, children }: ButtonProps) => { // children 추가
    const router = useRouter();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        // path prop이 있으면 페이지를 이동합니다.
        if (path) {
            router.push(path);
        }
        // 원래 onClick 함수가 정의되어 있으면 실행합니다.
        if (onClick) {
            onClick(event);
        }
    };
    
    // className prop이 제공되면 해당 클래스를 사용하고, 그렇지 않으면 'white-button'을 기본값으로 설정합니다.
    const buttonClass = `${styles.button} ${styles[className || 'white-button']}`;

    const iconStyle = iconColor ? { color: iconColor } : undefined;

    // 최종적으로 버튼 내부에 표시될 내용을 결정합니다.
    // children이 제공되면 children을 사용하고, 그렇지 않으면 text prop을 사용합니다.
    const content = children ?? text; // children이 null 또는 undefined일 때만 text를 사용합니다.

    return (
        <button
            className={buttonClass}
            onClick={handleClick}
            disabled={disabled}
        >
            {/* Icon prop이 있을 때만 아이콘을 렌더링합니다. */}
            {Icon && (
                <span className={styles['button-icon']}>
                    <Icon style={iconStyle} />
                </span>
            )}
            {/* text prop 또는 children을 렌더링합니다. */}
            {content} {/* ✨ 수정된 부분: content 변수 사용 */}
        </button>
    );
};

export default Button;