import { COLORS } from "./color";

// 감정 Enum
export enum Emotion {
  HAPPY = "HAPPY",
  SAD = "SAD",
  ANGRY = "ANGRY",
  SURPRISE = "SURPRISE",
  ETC = "ETC",
}

// 감정 메타데이터 타입 정의
type EmotionMetadata = {
  label: string;
  images: {
    medium: string;
    small: string;
  };
  color: string;
};

// 감정별 메타데이터 정의
export const EMOTION_DATA: Record<Emotion, EmotionMetadata> = {
  [Emotion.HAPPY]: {
    label: "행복해요",
    images: {
      medium: "emotion-happy-m.svg",
      small: "emotion-happy-s.svg",
    },
    color: COLORS.red[60],
  },
  [Emotion.SAD]: {
    label: "슬퍼요",
    images: {
      medium: "emotion-sad-m.svg",
      small: "emotion-sad-s.svg",
    },
    color: COLORS.blue[60],
  },
  [Emotion.ANGRY]: {
    label: "화나요",
    images: {
      medium: "emotion-angry-m.svg",
      small: "emotion-angry-s.svg",
    },
    color: COLORS.gray[60],
  },
  [Emotion.SURPRISE]: {
    label: "놀랐어요",
    images: {
      medium: "emotion-surprise-m.svg",
      small: "emotion-surprise-s.svg",
    },
    color: COLORS.yellow[60],
  },
  [Emotion.ETC]: {
    label: "기타",
    images: {
      medium: "emotion-etc-m.svg",
      small: "emotion-etc-s.svg",
    },
    color: COLORS.green[60],
  },
} as const;

// 헬퍼 함수: 감정에 따른 라벨 가져오기
export const getEmotionLabel = (emotion: Emotion): string => {
  return EMOTION_DATA[emotion].label;
};

// 헬퍼 함수: 감정에 따른 이미지 경로 가져오기
export const getEmotionImage = (
  emotion: Emotion,
  size: "medium" | "small" = "medium"
): string => {
  return EMOTION_DATA[emotion].images[size];
};

// 헬퍼 함수: 감정에 따른 색상 가져오기
export const getEmotionColor = (emotion: Emotion): string => {
  return EMOTION_DATA[emotion].color;
};

// 타입 정의
export type EmotionType = Emotion;
export type EmotionDataType = typeof EMOTION_DATA;

