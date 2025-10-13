import React, { InputHTMLAttributes, forwardRef } from 'react';
import styles from './styles.module.css';

export type InputVariant = 'primary' | 'secondary' | 'tertiary';
export type InputSize = 'small' | 'medium' | 'large';
export type InputTheme = 'light' | 'dark';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: InputVariant;
  size?: InputSize;
  theme?: InputTheme;
  error?: boolean;
  success?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      theme = 'light',
      error = false,
      success = false,
      className = '',
      disabled = false,
      ...props
    },
    ref
  ) => {
    const inputClassName = [
      styles.input,
      styles[`input--${variant}`],
      styles[`input--${size}`],
      styles[`input--${theme}`],
      error && styles['input--error'],
      success && styles['input--success'],
      disabled && styles['input--disabled'],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <input
        ref={ref}
        className={inputClassName}
        disabled={disabled}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

