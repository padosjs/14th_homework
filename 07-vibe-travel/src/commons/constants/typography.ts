// Typography Tokens from Figma
// Named following pattern: {weight}_{fontSize}_{lineHeight}

// Bold weights (700)
export const b_28_36 = 'b_28_36';
export const b_24_32 = 'b_24_32';
export const b_20_28 = 'b_20_28';
export const b_16_24 = 'b_16_24';

// Bold weights - 14/20
export const b_14_20 = 'b_14_20';

// SemiBold weights (600)
export const sb_18_24 = 'sb_18_24';
export const sb_16_24 = 'sb_16_24';
export const sb_14_20 = 'sb_14_20';

// Medium weights (500)
export const me_20_24 = 'me_20_24';
export const me_16_24 = 'me_16_24';
export const me_16_20 = 'me_16_20';
export const me_14_20 = 'me_14_20';
export const me_13_20 = 'me_13_20';
export const me_12_20 = 'me_12_20';
export const me_11_12 = 'me_11_12';

// Regular weights (400)
export const r_20_24 = 'r_20_24';
export const r_16_24 = 'r_16_24';
export const r_14_20 = 'r_14_20';
export const r_12_20 = 'r_12_20';
export const r_11_12 = 'r_11_12';

// Light weights (300)
export const l_14_20 = 'l_14_20';
export const l_12_20 = 'l_12_20';

// Grouped typography object for easy access
export const typography = {
  bold: {
    'h1': b_28_36,      // 28px/36px
    'h2': b_24_32,      // 24px/32px
    'h3': b_20_28,      // 20px/28px
    'h4': b_16_24,      // 16px/24px
    'b_14': b_14_20,    // 14px/20px
  },
  semibold: {
    'lg': sb_18_24,     // 18px/24px
    'md': sb_16_24,     // 16px/24px
    'sm': sb_14_20,     // 14px/20px
  },
  medium: {
    'lg': me_20_24,     // 20px/24px
    'md': me_16_24,     // 16px/24px
    'md_20': me_16_20,  // 16px/20px
    'sm': me_14_20,     // 14px/20px
    'xs': me_13_20,     // 13px/20px
    'xxs': me_12_20,    // 12px/20px
    'tiny': me_11_12,   // 11px/12px
  },
  regular: {
    'lg': r_20_24,      // 20px/24px
    'md': r_16_24,      // 16px/24px
    'sm': r_14_20,      // 14px/20px
    'xs': r_12_20,      // 12px/20px
    'tiny': r_11_12,    // 11px/12px
  },
  light: {
    'sm': l_14_20,      // 14px/20px
    'xs': l_12_20,      // 12px/20px
  },
};

// Detailed typography styles with CSS properties
export const typographyStyles = {
  // Bold
  b_28_36: {
    fontSize: '28px',
    fontWeight: 700,
    lineHeight: '36px',
    fontFamily: '"Pretendard", sans-serif',
  },
  b_24_32: {
    fontSize: '24px',
    fontWeight: 700,
    lineHeight: '32px',
    fontFamily: '"Pretendard", sans-serif',
  },
  b_20_28: {
    fontSize: '20px',
    fontWeight: 700,
    lineHeight: '28px',
    fontFamily: '"Pretendard", sans-serif',
  },
  b_16_24: {
    fontSize: '16px',
    fontWeight: 700,
    lineHeight: '24px',
    fontFamily: '"Pretendard Variable", sans-serif',
  },
  b_14_20: {
    fontSize: '14px',
    fontWeight: 700,
    lineHeight: '20px',
    fontFamily: '"Pretendard Variable", sans-serif',
  },
  // SemiBold
  sb_18_24: {
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: '24px',
    fontFamily: '"Pretendard Variable", sans-serif',
  },
  sb_16_24: {
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '24px',
    fontFamily: '"Pretendard Variable", sans-serif',
  },
  sb_14_20: {
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: '20px',
    fontFamily: '"Pretendard Variable", sans-serif',
  },
  // Medium
  me_20_24: {
    fontSize: '20px',
    fontWeight: 500,
    lineHeight: '24px',
    fontFamily: '"Pretendard Variable", sans-serif',
  },
  me_16_24: {
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '24px',
    fontFamily: '"Pretendard Variable", sans-serif',
  },
  me_16_20: {
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '20px',
    fontFamily: '"Pretendard Variable", sans-serif',
  },
  me_14_20: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '20px',
    fontFamily: '"Pretendard Variable", sans-serif',
  },
  me_13_20: {
    fontSize: '13px',
    fontWeight: 500,
    lineHeight: '20px',
    fontFamily: '"Pretendard Variable", sans-serif',
  },
  me_12_20: {
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: '20px',
    fontFamily: '"Pretendard Variable", sans-serif',
  },
  me_11_12: {
    fontSize: '11px',
    fontWeight: 500,
    lineHeight: '12px',
    fontFamily: '"Pretendard Variable", sans-serif',
  },
  // Regular
  r_20_24: {
    fontSize: '20px',
    fontWeight: 400,
    lineHeight: '24px',
    fontFamily: '"Pretendard Variable", sans-serif',
  },
  r_16_24: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '24px',
    fontFamily: '"Pretendard Variable", sans-serif',
  },
  r_14_20: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '20px',
    fontFamily: '"Pretendard Variable", sans-serif',
  },
  r_12_20: {
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: '20px',
    fontFamily: '"Pretendard Variable", sans-serif',
  },
  r_11_12: {
    fontSize: '11px',
    fontWeight: 400,
    lineHeight: '12px',
    fontFamily: '"Pretendard Variable", sans-serif',
  },
  // Light
  l_14_20: {
    fontSize: '14px',
    fontWeight: 300,
    lineHeight: '20px',
    fontFamily: '"Pretendard Variable", sans-serif',
  },
  l_12_20: {
    fontSize: '12px',
    fontWeight: 300,
    lineHeight: '20px',
    fontFamily: '"Pretendard Variable", sans-serif',
  },
} as const;

// CSS variable format for use in globals.css and Tailwind
export const typographyTokens = {
  b_28_36: 'var(--typography-b-28-36)',
  b_24_32: 'var(--typography-b-24-32)',
  b_20_28: 'var(--typography-b-20-28)',
  b_16_24: 'var(--typography-b-16-24)',
  b_14_20: 'var(--typography-b-14-20)',
  sb_18_24: 'var(--typography-sb-18-24)',
  sb_16_24: 'var(--typography-sb-16-24)',
  sb_14_20: 'var(--typography-sb-14-20)',
  me_20_24: 'var(--typography-me-20-24)',
  me_16_24: 'var(--typography-me-16-24)',
  me_16_20: 'var(--typography-me-16-20)',
  me_14_20: 'var(--typography-me-14-20)',
  me_13_20: 'var(--typography-me-13-20)',
  me_12_20: 'var(--typography-me-12-20)',
  me_11_12: 'var(--typography-me-11-12)',
  r_20_24: 'var(--typography-r-20-24)',
  r_16_24: 'var(--typography-r-16-24)',
  r_14_20: 'var(--typography-r-14-20)',
  r_12_20: 'var(--typography-r-12-20)',
  r_11_12: 'var(--typography-r-11-12)',
  l_14_20: 'var(--typography-l-14-20)',
  l_12_20: 'var(--typography-l-12-20)',
};
