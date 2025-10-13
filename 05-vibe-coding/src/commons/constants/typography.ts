// 폰트 패밀리 정의
export const FONT_FAMILY = {
  korean: "Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif",
  english: "SUIT Variable, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', sans-serif",
} as const;

// 폰트 웨이트 정의
export const FONT_WEIGHT = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
} as const;

// 타이포그래피 스타일 타입
type TypographyStyle = {
  fontSize: number;
  lineHeight: number;
  fontWeight: number;
  fontFamily: string;
};

// Web (Desktop) 타이포그래피
export const WEB_TYPOGRAPHY = {
  headline: {
    headline01: {
      fontSize: 48,
      lineHeight: 60,
      fontWeight: FONT_WEIGHT.semibold,
      fontFamily: FONT_FAMILY.korean,
    },
    headline02: {
      fontSize: 36,
      lineHeight: 48,
      fontWeight: FONT_WEIGHT.semibold,
      fontFamily: FONT_FAMILY.korean,
    },
    headline03: {
      fontSize: 28,
      lineHeight: 36,
      fontWeight: FONT_WEIGHT.semibold,
      fontFamily: FONT_FAMILY.korean,
    },
  },
} as const;

// Mobile 타이포그래피
export const MOBILE_TYPOGRAPHY = {
  headline: {
    headline01: {
      fontSize: 24,
      lineHeight: 32,
      fontWeight: FONT_WEIGHT.bold,
      fontFamily: FONT_FAMILY.korean,
    },
    headline02: {
      fontSize: 22,
      lineHeight: 30,
      fontWeight: FONT_WEIGHT.extrabold,
      fontFamily: FONT_FAMILY.korean,
    },
    headline03: {
      fontSize: 20,
      lineHeight: 28,
      fontWeight: FONT_WEIGHT.bold,
      fontFamily: FONT_FAMILY.korean,
    },
  },
  title: {
    title01: {
      fontSize: 18,
      lineHeight: 24,
      fontWeight: FONT_WEIGHT.bold,
      fontFamily: FONT_FAMILY.korean,
    },
    title02: {
      fontSize: 16,
      lineHeight: 22,
      fontWeight: FONT_WEIGHT.bold,
      fontFamily: FONT_FAMILY.korean,
    },
    title03: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: FONT_WEIGHT.bold,
      fontFamily: FONT_FAMILY.korean,
    },
    subTitle01: {
      fontSize: 14,
      lineHeight: 22,
      fontWeight: FONT_WEIGHT.semibold,
      fontFamily: FONT_FAMILY.korean,
    },
    subTitle02: {
      fontSize: 12,
      lineHeight: 18,
      fontWeight: FONT_WEIGHT.semibold,
      fontFamily: FONT_FAMILY.korean,
    },
  },
  body: {
    body01: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: FONT_WEIGHT.medium,
      fontFamily: FONT_FAMILY.korean,
    },
    body02_m: {
      fontSize: 14,
      lineHeight: 22,
      fontWeight: FONT_WEIGHT.medium,
      fontFamily: FONT_FAMILY.korean,
    },
    body03: {
      fontSize: 12,
      lineHeight: 18,
      fontWeight: FONT_WEIGHT.medium,
      fontFamily: FONT_FAMILY.korean,
    },
    body01_r: {
      fontSize: 16,
      lineHeight: 22,
      fontWeight: FONT_WEIGHT.regular,
      fontFamily: FONT_FAMILY.korean,
    },
    body02_s: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: FONT_WEIGHT.regular,
      fontFamily: FONT_FAMILY.korean,
    },
    body03_r: {
      fontSize: 12,
      lineHeight: 16,
      fontWeight: FONT_WEIGHT.regular,
      fontFamily: FONT_FAMILY.korean,
    },
  },
  caption: {
    caption01: {
      fontSize: 12,
      lineHeight: 14,
      fontWeight: FONT_WEIGHT.semibold,
      fontFamily: FONT_FAMILY.korean,
    },
    caption02_m: {
      fontSize: 10,
      lineHeight: 12,
      fontWeight: FONT_WEIGHT.semibold,
      fontFamily: FONT_FAMILY.korean,
    },
    caption02_s: {
      fontSize: 10,
      lineHeight: 12,
      fontWeight: FONT_WEIGHT.medium,
      fontFamily: FONT_FAMILY.korean,
    },
    caption03: {
      fontSize: 8,
      lineHeight: 10,
      fontWeight: FONT_WEIGHT.semibold,
      fontFamily: FONT_FAMILY.korean,
    },
  },
} as const;

// 통합 타이포그래피 (웹 + 모바일)
export const TYPOGRAPHY = {
  web: WEB_TYPOGRAPHY,
  mobile: MOBILE_TYPOGRAPHY,
} as const;

// CSS-in-JS 헬퍼 함수
export const getTypographyStyle = (style: TypographyStyle) => ({
  fontSize: `${style.fontSize}px`,
  lineHeight: `${style.lineHeight}px`,
  fontWeight: style.fontWeight,
  fontFamily: style.fontFamily,
});

// 타입 정의
export type FontFamily = typeof FONT_FAMILY;
export type FontWeight = typeof FONT_WEIGHT;
export type WebTypography = typeof WEB_TYPOGRAPHY;
export type MobileTypography = typeof MOBILE_TYPOGRAPHY;
export type Typography = typeof TYPOGRAPHY;

