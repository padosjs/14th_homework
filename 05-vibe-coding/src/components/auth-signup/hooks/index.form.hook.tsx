"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useModal } from "@/commons/providers/modal/modal.provider";
import { Modal } from "@/commons/components/modal";
import { URL_PATHS } from "@/commons/constants/url";
import { useState } from "react";

// Zod 스키마 정의
const signupSchema = z
  .object({
    email: z.string().min(1, "이메일을 입력해주세요").includes("@", {
      message: "이메일 형식이 올바르지 않습니다 (@를 포함해야 합니다)",
    }),
    password: z
      .string()
      .min(8, "비밀번호는 최소 8자리 이상이어야 합니다")
      .regex(/[a-zA-Z]/, "비밀번호는 영문을 포함해야 합니다")
      .regex(/[0-9]/, "비밀번호는 숫자를 포함해야 합니다"),
    passwordConfirm: z.string().min(1, "비밀번호 확인을 입력해주세요"),
    name: z.string().min(1, "이름을 입력해주세요"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["passwordConfirm"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

// GraphQL API 호출 함수
const createUser = async (input: {
  email: string;
  password: string;
  name: string;
}) => {
  const response = await fetch("/api/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        mutation createUser($createUserInput: CreateUserInput!) {
          createUser(createUserInput: $createUserInput) {
            _id
          }
        }
      `,
      variables: {
        createUserInput: input,
      },
    }),
  });

  const result = await response.json();

  if (result.errors) {
    throw new Error(result.errors[0].message);
  }

  return result.data.createUser;
};

export default function useSignupForm() {
  const router = useRouter();
  const { openModal, closeModal } = useModal();
  const [hasShownSuccessModal, setHasShownSuccessModal] = useState(false);
  const [hasShownErrorModal, setHasShownErrorModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      // 모달은 한 번만 표시
      if (!hasShownSuccessModal) {
        setHasShownSuccessModal(true);
        openModal(
          <Modal
            variant="info"
            actions="single"
            title="회원가입 완료"
            description="회원가입이 완료되었습니다."
            confirmText="확인"
            onConfirm={() => {
              closeModal();
              router.push(URL_PATHS.auth.login);
            }}
          />
        );
      }
    },
    onError: (error) => {
      // 모달은 한 번만 표시
      if (!hasShownErrorModal) {
        setHasShownErrorModal(true);
        openModal(
          <Modal
            variant="danger"
            actions="single"
            title="회원가입 실패"
            description={error instanceof Error ? error.message : "회원가입에 실패했습니다."}
            confirmText="확인"
            onConfirm={() => {
              closeModal();
              setHasShownErrorModal(false); // 다음 시도를 위해 리셋
            }}
          />
        );
      }
    },
  });

  const onSubmit = (data: SignupFormData) => {
    mutation.mutate({
      email: data.email,
      password: data.password,
      name: data.name,
    });
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isValid,
    isLoading: mutation.isPending,
  };
}

