// URL 경로 상수 정의
export const URL_PATHS = {
  auth: {
    login: "/auth/login",
    signup: "/auth/signup",
  },
  diaries: {
    list: "/diaries",
    detail: (id: string) => `/diaries/${id}`,
  },
  pictures: {
    list: "/pictures",
  },
} as const;

// 접근 권한 타입
export type AccessType = "public" | "member";

// 레이아웃 노출 옵션
export type LayoutVisibility = {
  header: {
    show: boolean;
    logo: boolean;
    darkModeToggle: boolean;
  };
  banner: boolean;
  navigation: boolean;
  footer: boolean;
};

// URL 메타데이터
export type UrlMetadata = {
  path: string;
  access: AccessType;
  layout: LayoutVisibility;
};

// URL별 메타데이터
export const URL_METADATA: Record<string, UrlMetadata> = {
  // 로그인
  "/auth/login": {
    path: "/auth/login",
    access: "public",
    layout: {
      header: {
        show: false,
        logo: false,
        darkModeToggle: false,
      },
      banner: false,
      navigation: false,
      footer: false,
    },
  },
  
  // 회원가입
  "/auth/signup": {
    path: "/auth/signup",
    access: "public",
    layout: {
      header: {
        show: false,
        logo: false,
        darkModeToggle: false,
      },
      banner: false,
      navigation: false,
      footer: false,
    },
  },
  
  // 일기목록
  "/diaries": {
    path: "/diaries",
    access: "public",
    layout: {
      header: {
        show: true,
        logo: true,
        darkModeToggle: false,
      },
      banner: true,
      navigation: true,
      footer: true,
    },
  },
  
  // 일기상세 (다이나믹 라우팅)
  "/diaries/[id]": {
    path: "/diaries/[id]",
    access: "member",
    layout: {
      header: {
        show: true,
        logo: true,
        darkModeToggle: false,
      },
      banner: false,
      navigation: false,
      footer: true,
    },
  },
  
  // 사진목록
  "/pictures": {
    path: "/pictures",
    access: "public",
    layout: {
      header: {
        show: true,
        logo: true,
        darkModeToggle: false,
      },
      banner: true,
      navigation: true,
      footer: true,
    },
  },
};

// 헬퍼 함수: 경로에 해당하는 메타데이터 가져오기
export const getUrlMetadata = (path: string): UrlMetadata | undefined => {
  // 정확한 경로 매칭 먼저 시도
  if (URL_METADATA[path]) {
    return URL_METADATA[path];
  }
  
  // 다이나믹 라우팅 매칭
  // /diaries/123 -> /diaries/[id]
  if (path.startsWith("/diaries/") && path !== "/diaries") {
    return URL_METADATA["/diaries/[id]"];
  }
  
  return undefined;
};

// 헬퍼 함수: 접근 권한 확인
export const checkAccess = (path: string, isLoggedIn: boolean): boolean => {
  const metadata = getUrlMetadata(path);
  if (!metadata) return false;
  
  if (metadata.access === "member") {
    return isLoggedIn;
  }
  
  return true; // public은 누구나 접근 가능
};

// 헬퍼 함수: 레이아웃 표시 여부 가져오기
export const getLayoutVisibility = (path: string): LayoutVisibility | undefined => {
  const metadata = getUrlMetadata(path);
  return metadata?.layout;
};

// 타입 정의
export type UrlPaths = typeof URL_PATHS;

