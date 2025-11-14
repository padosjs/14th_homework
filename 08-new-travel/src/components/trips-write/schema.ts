import z from "zod";

// 폼 스키마 인터페이스
export interface ISchema {
  name: string;
  remarks: string;
  contents: string;
  price: string;
  tags?: string;
  zipcode?: string;
  address?: string;
  addressDetail?: string;
}

// 등록 모드용 검증 스키마 (모든 필수 필드)
export const schema = z.object({
  name: z.string().min(1, { message: "상품명을 입력해주세요." }),
  remarks: z.string().min(1, { message: "한줄 요약을 입력해주세요." }),
  contents: z.string().min(1, { message: "상품 설명을 입력해주세요." }),
  price: z
    .string()
    .min(1, { message: "판매 가격을 입력해주세요." })
    .regex(/^\d+$/, { message: "숫자만 입력 가능합니다." }),
  tags: z.string().optional(),
  zipcode: z.string().optional(),
  address: z.string().optional(),
  addressDetail: z.string().optional(),
});

// 수정 모드용 검증 스키마 (필수 필드는 동일)
export const editSchema = z.object({
  name: z.string().min(1, { message: "상품명을 입력해주세요." }),
  remarks: z.string().min(1, { message: "한줄 요약을 입력해주세요." }),
  contents: z.string().min(1, { message: "상품 설명을 입력해주세요." }),
  price: z
    .string()
    .min(1, { message: "판매 가격을 입력해주세요." })
    .regex(/^\d+$/, { message: "숫자만 입력 가능합니다." }),
  tags: z.string().optional(),
  zipcode: z.string().optional(),
  address: z.string().optional(),
  addressDetail: z.string().optional(),
});
