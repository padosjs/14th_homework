import z from "zod"

// 타입 O => 에디터 검사(빨간 줄): 컴파일 시점
export interface IScehma {
    writer: string // 추가: react-hook-form에서 사용
    password: string // 추가: react-hook-form에서 사용
    title: string
    content: string
    zipcode?: string // 추가: react-hook-form에서 사용
    address?: string // 추가: react-hook-form에서 사용
    addressDetail?: string // 추가: react-hook-form에서 사용
    youtubeUrl?: string // 추가: react-hook-form에서 사용
}

// 타입 X => 브라우저 검사(validation): 런타임 시점 (등록 모드용)
export const schema = z.object({
    writer: z.string().min(1, { message: "작성자를 입력해주세요." }),
    password: z.string()
        .min(8, { message: "비밀번호는 8자 이상 입력해 주세요." })
        .max(16, { message: "비밀번호는 16자 이하로 입력해 주세요." }),
    title: z.string()
        .min(2, { message: "제목은 2자 이상 입력해 주세요." }),
    content: z.string().min(1, { message: "내용을 입력해주세요." }),
    zipcode: z.string().optional(),
    address: z.string().optional(),
    addressDetail: z.string().optional(),
    youtubeUrl: z.string().optional(),
})


// 타입 X => 브라우저 검사(validation): 런타임 시점 (수정 모드용)
// 수정 모드에서는 writer와 password를 검사할 필요가 없고, 
// defaultValues로 설정된 "●●●●●●" 때문에 isValid가 false가 되는 것을 방지합니다.
export const editSchema = z.object({
    // writer, password는 optional()을 붙여서 유효성 검사를 통과하도록 합니다.
    writer: z.string().optional(), 
    password: z.string().optional(),

    title: z.string()
        .min(2, { message: "제목은 2자 이상 입력해 주세요." }), // 수정 필수 항목
    content: z.string().min(1, { message: "내용을 입력해주세요." }), // 수정 필수 항목
    
    zipcode: z.string().optional(),
    address: z.string().optional(),
    addressDetail: z.string().optional(),
    youtubeUrl: z.string().optional(),
})