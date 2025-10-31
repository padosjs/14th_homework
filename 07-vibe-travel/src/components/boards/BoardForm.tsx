"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useMutation } from "@apollo/client"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { CREATE_BOARD, UPDATE_BOARD, UPLOAD_FILE } from "@/lib/graphql"
import type {
  CreateBoardResponse,
  UpdateBoardResponse,
  GraphQLBoardDetail,
  CreateBoardInput,
  UpdateBoardInput
} from "@/types/board"

interface FormData {
  author: string
  password: string
  title: string
  content: string
  postalCode: string
  address: string
  detailAddress: string
  youtubeLink: string
  images: (File | null)[]
  existingImages: (string | null)[]
}

interface ImagePreview {
  file?: File
  url: string
  isExisting?: boolean
}

interface BoardFormProps {
  mode: "create" | "edit"
  boardId?: string
  initialData?: GraphQLBoardDetail
}

// 이미지 URL 정규화 함수
function normalizeImageUrl(src: string): string {
  if (!src) return src
  if (/^https?:\/\//i.test(src)) return src
  if (src.startsWith("/")) return src
  return `https://storage.googleapis.com/${encodeURI(src)}`
}

export default function BoardForm({ mode, boardId, initialData }: BoardFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    author: "",
    password: "",
    title: "",
    content: "",
    postalCode: "",
    address: "",
    detailAddress: "",
    youtubeLink: "",
    images: [null, null, null],
    existingImages: [null, null, null],
  })
  const [imagePreviews, setImagePreviews] = useState<(ImagePreview | null)[]>([
    null,
    null,
    null,
  ])
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([null, null, null])
  const [loading, setLoading] = useState(false)

  const [createBoard] = useMutation<CreateBoardResponse>(CREATE_BOARD)
  const [updateBoard] = useMutation<UpdateBoardResponse>(UPDATE_BOARD)
  const [uploadFile] = useMutation(UPLOAD_FILE)

  // 수정 모드일 때 초기 데이터 설정
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        author: initialData.writer,
        password: "*********",
        title: initialData.title,
        content: initialData.contents,
        postalCode: initialData.boardAddress?.zipcode || "",
        address: initialData.boardAddress?.address || "",
        detailAddress: initialData.boardAddress?.addressDetail || "",
        youtubeLink: initialData.youtubeUrl || "",
        images: [null, null, null],
        existingImages: [
          initialData.images?.[0] || null,
          initialData.images?.[1] || null,
          initialData.images?.[2] || null,
        ],
      })

      // 기존 이미지 미리보기 설정
      const previews: (ImagePreview | null)[] = [null, null, null]
      initialData.images?.forEach((url, index) => {
        if (index < 3 && url) {
          previews[index] = { url: normalizeImageUrl(url), isExisting: true }
        }
      })
      setImagePreviews(previews)
    }
  }, [mode, initialData])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageClick = (index: number) => {
    fileInputRefs.current[index]?.click()
  }

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0]
    if (!file) return

    // 기본 검증: 이미지 타입, 최대 5MB
    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드할 수 있습니다.")
      e.target.value = ""
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("파일 크기는 5MB를 초과할 수 없습니다.")
      e.target.value = ""
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const url = event.target?.result as string
      setImagePreviews((prev) => {
        const newPreviews = [...prev]
        newPreviews[index] = { file, url, isExisting: false }
        return newPreviews
      })
      setFormData((prev) => {
        const newImages = [...prev.images]
        newImages[index] = file
        const newExistingImages = [...prev.existingImages]
        newExistingImages[index] = null
        return { ...prev, images: newImages, existingImages: newExistingImages }
      })
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveImage = (index: number) => {
    setImagePreviews((prev) => {
      const newPreviews = [...prev]
      newPreviews[index] = null
      return newPreviews
    })
    setFormData((prev) => {
      const newImages = [...prev.images]
      newImages[index] = null
      const newExistingImages = [...prev.existingImages]
      newExistingImages[index] = null
      return { ...prev, images: newImages, existingImages: newExistingImages }
    })
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index]!.value = ""
    }
  }

  const handleSearchPostcode = async () => {}

  const handleCancel = () => {
    router.back()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // 필수 필드 검증
    if (mode === "create") {
      if (!formData.author.trim()) {
        alert("작성자명을 입력해주세요.")
        return
      }
      if (!formData.password.trim()) {
        alert("비밀번호를 입력해주세요.")
        return
      }
    }
    if (!formData.title.trim()) {
      alert("제목을 입력해주세요.")
      return
    }
    if (!formData.content.trim()) {
      alert("내용을 입력해주세요.")
      return
    }

    if (mode === "edit") {
      // 수정 모드: 비밀번호 확인 프롬프트
      const password = prompt("글을 작성할 때 입력하셨던 비밀번호를 입력해 주세요.")
      if (!password) return // 취소 처리

      try {
        setLoading(true)

        // 이미지 처리: 새 이미지 업로드
        const finalImages: string[] = []
        for (let i = 0; i < 3; i++) {
          if (formData.images[i]) {
            // 새 이미지 업로드
            const result = await uploadFile({ variables: { file: formData.images[i] } })
            finalImages.push(result.data?.uploadFile?.url as string)
          } else if (formData.existingImages[i]) {
            // 기존 이미지 유지
            finalImages.push(formData.existingImages[i]!)
          }
        }

        const updateBoardInput: UpdateBoardInput = {
          title: formData.title,
          contents: formData.content,
        }

        if (formData.youtubeLink.trim()) {
          updateBoardInput.youtubeUrl = formData.youtubeLink
        }

        if (formData.address.trim() || formData.detailAddress.trim()) {
          updateBoardInput.boardAddress = {
            ...(formData.postalCode.trim() && { zipcode: formData.postalCode }),
            ...(formData.address.trim() && { address: formData.address }),
            ...(formData.detailAddress.trim() && {
              addressDetail: formData.detailAddress,
            }),
          }
        }

        if (finalImages.length > 0) {
          updateBoardInput.images = finalImages
        }

        await updateBoard({
          variables: {
            boardId: boardId!,
            password,
            updateBoardInput,
          },
        })

        alert("수정 완료!")
        router.push(`/boards/${boardId}`)
      } catch (error: unknown) {
        console.error("게시물 수정 중 오류 발생:", error)
        const errorMessage = (error instanceof Error) ? error.message : "게시물 수정에 실패했습니다."
        alert(errorMessage)
      } finally {
        setLoading(false)
      }
    } else {
      // 등록 모드
      try {
        setLoading(true)

        // GraphQL mutation 변수 생성
        const createBoardInput: CreateBoardInput = {
          writer: formData.author,
          password: formData.password,
          title: formData.title,
          contents: formData.content,
        }

        // 선택값 추가
        if (formData.youtubeLink.trim()) {
          createBoardInput.youtubeUrl = formData.youtubeLink
        }

        if (formData.address.trim() || formData.detailAddress.trim()) {
          createBoardInput.boardAddress = {
            ...(formData.postalCode.trim() && { zipcode: formData.postalCode }),
            ...(formData.address.trim() && { address: formData.address }),
            ...(formData.detailAddress.trim() && {
              addressDetail: formData.detailAddress,
            }),
          }
        }

        // 선택된 이미지 업로드
        const files = formData.images.filter(Boolean) as File[]
        if (files.length > 0) {
          const uploadedUrls = await Promise.all(
            files.map(async (f) => {
              const result = await uploadFile({ variables: { file: f } })
              return result.data?.uploadFile?.url as string
            })
          )
          if (uploadedUrls.length > 0) {
            createBoardInput.images = uploadedUrls
          }
        }

        const response = await createBoard({
          variables: { createBoardInput },
        })

        const newBoardId = response.data?.createBoard._id
        if (newBoardId) {
          alert("게시물이 등록되었습니다.")
          router.push(`/boards/${newBoardId}`)
        }
      } catch (error) {
        console.error("게시물 등록 중 오류 발생:", error)
        alert("게시물 등록에 실패했습니다.")
      } finally {
        setLoading(false)
      }
    }
  }

  const isEditMode = mode === "edit"

  return (
    <main className="min-h-screen w-full bg-white">
      <div className="max-w-[1280px] mx-auto px-8 py-10">
        {/* 페이지 제목 */}
        <h1 className="typography-b-20-28 text-gray-900 mb-10">
          {isEditMode ? "게시물 수정" : "게시물 등록"}
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          {/* 작성자 & 비밀번호 */}
          <div className="flex gap-10">
            <div className="flex-1 flex flex-col gap-2">
              <label className="typography-me-16-24 text-gray-800">
                작성자
                {!isEditMode && <span className="text-brand-error ml-1">*</span>}
              </label>
              <Input
                variant="form"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                placeholder="작성자 명을 입력해 주세요."
                disabled={isEditMode}
              />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label className="typography-me-16-24 text-gray-800">
                비밀번호
                {!isEditMode && <span className="text-brand-error ml-1">*</span>}
              </label>
              <Input
                variant="form"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="비밀번호를 입력해 주세요."
                disabled={isEditMode}
              />
            </div>
          </div>

          <hr className="border-t border-gray-200" />

          {/* 제목 */}
          <div className="flex flex-col gap-2">
            <label className="typography-me-16-24 text-gray-800">
              제목
              <span className="text-brand-error ml-1">*</span>
            </label>
            <Input
              variant="form"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="제목을 입력해 주세요."
            />
          </div>

          <hr className="border-t border-gray-200" />

          {/* 내용 */}
          <div className="flex flex-col gap-2">
            <label className="typography-me-16-24 text-gray-800">
              내용
              <span className="text-brand-error ml-1">*</span>
            </label>
            <Textarea
              variant="form"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="내용을 입력해 주세요."
              className="h-[336px]"
            />
          </div>

          <hr className="border-t border-gray-200" />

          {/* 주소 */}
          <div className="flex flex-col gap-2">
            <label className="typography-me-16-24 text-gray-800">주소</label>
            <div className="flex gap-2">
              <Input
                variant="form"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                placeholder="01234"
                className="w-56"
              />
              <Button
                variant="tertiary"
                size="m"
                type="button"
                onClick={handleSearchPostcode}
              >
                우편번호 검색
              </Button>
            </div>
            <Input
              variant="form"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="주소를 입력해 주세요."
            />
            <Input
              variant="form"
              name="detailAddress"
              value={formData.detailAddress}
              onChange={handleInputChange}
              placeholder="상세주소"
            />
          </div>

          <hr className="border-t border-gray-200" />

          {/* 유튜브 링크 */}
          <div className="flex flex-col gap-2">
            <label className="typography-me-16-24 text-gray-800">유튜브 링크</label>
            <Input
              variant="form"
              name="youtubeLink"
              value={formData.youtubeLink}
              onChange={handleInputChange}
              placeholder="링크를 입력해 주세요."
            />
          </div>

          <hr className="border-t border-gray-200" />

          {/* 사진 첨부 */}
          <div className="flex flex-col gap-2">
            <label className="typography-me-16-24 text-gray-800">사진 첨부</label>
            <div className="flex gap-4">
              {[0, 1, 2].map((index) => (
                <div
                  key={index}
                  className="relative w-40 h-40 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors group"
                  onClick={() => handleImageClick(index)}
                >
                  <input
                    ref={(el) => {
                      fileInputRefs.current[index] = el
                    }}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, index)}
                    className="hidden"
                  />

                  {imagePreviews[index] ? (
                    <>
                      <img
                        src={imagePreviews[index]!.url}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRemoveImage(index)
                        }}
                        className="absolute top-2 right-2 bg-black/50 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="w-10 h-10 flex items-center justify-center mb-2">
                        <svg
                          width="40"
                          height="40"
                          viewBox="0 0 40 40"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20 8V32M8 20H32"
                            stroke="#777777"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <p className="typography-r-16-24 text-gray-600 text-center px-2">
                        클릭해서 사진 업로드
                      </p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          <hr className="border-t border-gray-200" />

          {/* 버튼 */}
          <div className="flex gap-4 justify-end pt-6">
            <Button
              variant="tertiary"
              size="m"
              type="button"
              onClick={handleCancel}
              disabled={loading}
            >
              취소
            </Button>
            <Button variant="primary" size="m" type="submit" disabled={loading}>
              {loading
                ? isEditMode
                  ? "수정 중..."
                  : "등록 중..."
                : isEditMode
                ? "수정하기"
                : "등록하기"}
            </Button>
          </div>
        </form>
      </div>
    </main>
  )
}
