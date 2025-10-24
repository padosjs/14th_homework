import React, { InputHTMLAttributes, forwardRef } from 'react';
import Image from 'next/image';
import styles from './styles.module.css';

export type SearchbarVariant = 'primary' | 'secondary' | 'tertiary';
export type SearchbarSize = 'small' | 'medium' | 'large';
export type SearchbarTheme = 'light' | 'dark';

export interface SearchbarProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: SearchbarVariant;
  size?: SearchbarSize;
  theme?: SearchbarTheme;
  onSearch?: (value: string) => void;
}

export const Searchbar = forwardRef<HTMLInputElement, SearchbarProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      theme = 'light',
      className = '',
      disabled = false,
      placeholder = '검색어를 입력해 주세요.',
      onSearch,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    const containerClassName = [
      styles.searchbar,
      styles[`searchbar--${variant}`],
      styles[`searchbar--${size}`],
      styles[`searchbar--${theme}`],
      disabled && styles['searchbar--disabled'],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && onSearch) {
        onSearch(e.currentTarget.value);
      }
      onKeyDown?.(e);
    };

    const handleSearchClick = () => {
      if (onSearch && inputRef.current) {
        onSearch(inputRef.current.value);
      }
    };

    const iconSize = size === 'small' ? 20 : size === 'medium' ? 24 : 28;

    return (
      <div className={containerClassName}>
        <div 
          className={styles.searchbar__icon} 
          onClick={handleSearchClick}
          data-testid="search-button"
          style={{ cursor: 'pointer' }}
        >
          <Image
            src="/icons/search_outline_light_m.svg"
            alt="검색"
            width={iconSize}
            height={iconSize}
          />
        </div>
        <input
          ref={(node) => {
            inputRef.current = node;
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          type="text"
          className={styles.searchbar__input}
          disabled={disabled}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          {...props}
        />
      </div>
    );
  }
);

Searchbar.displayName = 'Searchbar';

