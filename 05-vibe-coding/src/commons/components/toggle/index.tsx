'use client';

import React from 'react';
import styles from './styles.module.css';

export interface ToggleProps {
  /**
   * 토글 상태 (켜짐/꺼짐)
   */
  checked?: boolean;
  
  /**
   * 토글 상태 변경 핸들러
   */
  onChange?: (checked: boolean) => void;
  
  /**
   * 토글 스타일 변형
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'tertiary';
  
  /**
   * 토글 크기
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * 테마 (라이트/다크)
   * @default 'light'
   */
  theme?: 'light' | 'dark';
  
  /**
   * 비활성화 상태
   * @default false
   */
  disabled?: boolean;
  
  /**
   * 추가 CSS 클래스
   */
  className?: string;
  
  /**
   * 접근성을 위한 라벨
   */
  ariaLabel?: string;
}

/**
 * Toggle 컴포넌트
 * 
 * @example
 * ```tsx
 * <Toggle 
 *   checked={isEnabled}
 *   onChange={setIsEnabled}
 *   variant="primary"
 *   size="medium"
 *   theme="light"
 * />
 * ```
 */
export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      checked = false,
      onChange,
      variant = 'primary',
      size = 'medium',
      theme = 'light',
      disabled = false,
      className,
      ariaLabel,
    },
    ref
  ) => {
    const handleClick = () => {
      if (!disabled && onChange) {
        onChange(!checked);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleClick();
      }
    };

    const toggleClasses = [
      styles.toggle,
      styles[`variant-${variant}`],
      styles[`size-${size}`],
      styles[`theme-${theme}`],
      checked && styles.checked,
      disabled && styles.disabled,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={ariaLabel}
        disabled={disabled}
        className={toggleClasses}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        <span className={styles.track}>
          <span className={styles.thumb} />
        </span>
      </button>
    );
  }
);

Toggle.displayName = 'Toggle';

export default Toggle;

