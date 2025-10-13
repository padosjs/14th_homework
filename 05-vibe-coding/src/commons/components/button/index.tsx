import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './styles.module.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼의 시각적 스타일 변형 */
  variant?: 'primary' | 'secondary' | 'tertiary';
  /** 버튼의 크기 */
  size?: 'small' | 'medium' | 'large';
  /** 테마 설정 */
  theme?: 'light' | 'dark';
  /** 비활성화 상태 */
  disabled?: boolean;
  /** 전체 너비 사용 여부 */
  fullWidth?: boolean;
  /** 버튼 텍스트 */
  children?: ReactNode;
  /** 왼쪽 아이콘 */
  leftIcon?: ReactNode;
  /** 오른쪽 아이콘 */
  rightIcon?: ReactNode;
  /** 추가 클래스명 */
  className?: string;
}

export const Button = ({
  variant = 'primary',
  size = 'medium',
  theme = 'light',
  disabled = false,
  fullWidth = false,
  children,
  leftIcon,
  rightIcon,
  className = '',
  ...props
}: ButtonProps) => {
  const classNames = [
    styles.button,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    styles[`theme-${theme}`],
    disabled && styles.disabled,
    fullWidth && styles.fullWidth,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classNames} disabled={disabled} {...props}>
      {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
      {children && <span className={styles.content}>{children}</span>}
      {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
    </button>
  );
};

export default Button;

