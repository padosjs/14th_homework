// Color 상수 정의
export const COLORS = {
  // Blue 계열
  blue: {
    5: "#F0F7FF",
    10: "#DBEEFF",
    20: "#BDDBFF",
    30: "#93BEFF",
    40: "#6DA5FA",
    50: "#497CFF",
    60: "#3A5CF3",
    70: "#274AE1",
    80: "#1530A6",
    90: "#0B2184",
  },
  
  // Gray 계열
  gray: {
    white: "#FFFFFF",
    5: "#F2F2F2",
    10: "#E4E4E4",
    20: "#D4D3D3",
    30: "#C7C7C7",
    40: "#ABABAB",
    50: "#919191",
    60: "#777777",
    70: "#5F5F5F",
    80: "#333333",
    90: "#1C1C1C",
    black: "#000000",
  },
  
  // Red 계열
  red: {
    5: "#FDD7DC",
    10: "#F797A4",
    20: "#F4677A",
    30: "#F03851", // Error color
    40: "#E4112E",
    50: "#B40E24",
    60: "#850A1B",
  },
  
  // Green 계열
  green: {
    5: "#D3F3E0",
    10: "#92E6B9",
    20: "#15D66F",
    30: "#12B75F", // Success color
    40: "#109C51",
    50: "#0E723C",
    60: "#084424",
  },
  
  // Yellow 계열
  yellow: {
    5: "#FFE499",
    10: "#FFD666",
    20: "#FFC933",
    30: "#FFB300",
    40: "#EBA500",
    50: "#D69600",
    60: "#B27D00",
  },
  
  // Cool Gray 계열
  coolGray: {
    1: "#F8F8FA",
    5: "#F6F6F9",
    10: "#EDEEF2",
    20: "#DDDFE5",
    30: "#D2D4DD",
    40: "#C7C9D5",
    50: "#BBBECD",
    60: "#B0B3C4",
  },
  
  // Gradients
  gradient: {
    primary: "linear-gradient(135deg, #6DA5FA 0%, #92EAF5 100%)",
    skeleton: "linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.6) 48.5%, rgba(255, 255, 255, 0) 100%)",
  },
} as const;

// 시스템 컬러 (주요 사용 색상)
export const SYSTEM_COLORS = {
  primary: COLORS.blue[40],
  primaryStrong: COLORS.blue[60],
  error: COLORS.red[30],
  success: COLORS.green[30],
  warning: COLORS.yellow[30],
} as const;

// 타입 정의
export type ColorPalette = typeof COLORS;
export type SystemColors = typeof SYSTEM_COLORS;

