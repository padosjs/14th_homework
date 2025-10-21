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
const loginSchema = z.object({
  email: z.string().min(1, "이메일을 입력해주세요").includes("@", {
    message: "이메일 형식이 올바르지 않습니다 (@를 포함해야 합니다)",
  }),
  password: z.string().min(1, "비밀번호를 입력해주세요"),
});

type LoginFormData = z.infer<typeof loginSchema>;

// GraphQL API 호출 함수
const loginUser = async (input: { email: string; password: string }) => {
  const response = await fetch("/api/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        mutation loginUser($email: String!, $password: String!) {
          loginUser(email: $email, password: $password) {
            accessToken
          }
        }
      `,
      variables: input,
    }),
  });

  const result = await response.json();

  if (result.errors) {
    throw new Error(result.errors[0].message);
  }

  return result.data.loginUser;
};

const fetchUserLoggedIn = async (accessToken: string) => {
  const response = await fetch("/api/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      query: `
        query {
          fetchUserLoggedIn {
            _id
            name
          }
        }
      `,
    }),
  });

  const result = await response.json();

  if (result.errors) {
    throw new Error(result.errors[0].message);
  }

  return result.data.fetchUserLoggedIn;
};

export default function useLoginForm() {
  const router = useRouter();
  const { openModal, closeModal } = useModal();
  const [hasShownSuccessModal, setHasShownSuccessModal] = useState(false);
  const [hasShownErrorModal, setHasShownErrorModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: async (data) => {
      try {
        // accessToken 저장
        const { accessToken } = data;
        localStorage.setItem("accessToken", accessToken);

        // 회원정보 조회
        const user = await fetchUserLoggedIn(accessToken);
        localStorage.setItem("user", JSON.stringify({ _id: user._id, name: user.name }));

        // auth-change 이벤트 발생 (AuthProvider에 알림)
        window.dispatchEvent(new Event("auth-change"));

        // 모달은 한 번만 표시
        if (!hasShownSuccessModal) {
          setHasShownSuccessModal(true);
          openModal(
            <Modal
              variant="info"
              actions="single"
              title="로그인 완료"
              description="로그인이 완료되었습니다."
              confirmText="확인"
              onConfirm={() => {
                closeModal();
                router.push(URL_PATHS.diaries.list);
              }}
            />
          );
        }
      } catch (error) {
        // fetchUserLoggedIn 실패 시 에러 처리
        if (!hasShownErrorModal) {
          setHasShownErrorModal(true);
          openModal(
            <Modal
              variant="danger"
              actions="single"
              title="로그인 실패"
              description={error instanceof Error ? error.message : "로그인에 실패했습니다."}
              confirmText="확인"
              onConfirm={() => {
                closeModal();
                setHasShownErrorModal(false);
              }}
            />
          );
        }
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
            title="로그인 실패"
            description={error instanceof Error ? error.message : "로그인에 실패했습니다."}
            confirmText="확인"
            onConfirm={() => {
              closeModal();
              setHasShownErrorModal(false);
            }}
          />
        );
      }
    },
  });

  const onSubmit = (data: LoginFormData) => {
    mutation.mutate({
      email: data.email,
      password: data.password,
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



