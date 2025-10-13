import React, { SelectHTMLAttributes, forwardRef } from 'react';
import Image from 'next/image';
import styles from './styles.module.css';

export type SelectboxVariant = 'primary' | 'secondary' | 'tertiary';
export type SelectboxSize = 'small' | 'medium' | 'large';
export type SelectboxTheme = 'light' | 'dark';

export interface SelectboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectboxProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  variant?: SelectboxVariant;
  size?: SelectboxSize;
  theme?: SelectboxTheme;
  options?: SelectboxOption[];
  placeholder?: string;
  error?: boolean;
  success?: boolean;
}

export const Selectbox = forwardRef<HTMLSelectElement, SelectboxProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      theme = 'light',
      options = [],
      placeholder = '전체',
      error = false,
      success = false,
      className = '',
      disabled = false,
      ...props
    },
    ref
  ) => {
    const containerClassName = [
      styles.selectbox,
      styles[`selectbox--${variant}`],
      styles[`selectbox--${size}`],
      styles[`selectbox--${theme}`],
      error && styles['selectbox--error'],
      success && styles['selectbox--success'],
      disabled && styles['selectbox--disabled'],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const iconSize = size === 'small' ? 20 : size === 'medium' ? 24 : 28;

    return (
      <div className={containerClassName}>
        <select
          ref={ref}
          className={styles.selectbox__select}
          disabled={disabled}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        <div className={styles.selectbox__icon}>
          <Image
            src="/icons/arrow_drop_down.svg"
            alt="선택"
            width={iconSize}
            height={iconSize}
          />
        </div>
      </div>
    );
  }
);

Selectbox.displayName = 'Selectbox';

