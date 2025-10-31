'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useMutation } from '@apollo/client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CREATE_USER } from '@/lib/graphql'

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [createUser] = useMutation(CREATE_USER)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // 유효성 검사
    if (!email || !name || !password || !passwordConfirm) {
      setError('모든 필드를 입력해주세요.')
      return
    }

    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.')
      return
    }

    if (password.length < 6) {
      setError('비밀번호는 6글자 이상이어야 합니다.')
      return
    }

    try {
      setIsLoading(true)
      await createUser({
        variables: {
          createUserInput: {
            email,
            name,
            password,
          },
        },
      })

      // 회원가입 성공 후 로그인 페이지로 이동
      router.push('/login')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '회원가입에 실패했습니다.'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-screen h-screen bg-white flex">
      {/* Left Side - Signup Form */}
      <div className="w-[400px] bg-white flex flex-col items-center justify-start px-10 pt-[244px] pb-10">
        <div className="w-[320px]">
          {/* Header Section */}
          <div className="mb-6 flex flex-col gap-6 items-center">
            {/* Title */}
            <h2 className="typography-sb-18-24 text-gray-900 text-center w-full">
              회원가입
            </h2>

            {/* Description and Form Fields */}
            <div className="w-full flex flex-col gap-4 items-center">
              {/* Description */}
              <p className="typography-me-14-20 text-gray-800 text-center w-full">
                회원가입을 위해 아래 빈칸을 모두 채워 주세요.
              </p>

              {/* Error Message */}
              {error && (
                <div className="w-full p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
                  {error}
                </div>
              )}

              {/* Form Fields Container */}
              <form className="w-full flex flex-col gap-3" onSubmit={handleSignup}>
                {/* Email Field */}
                <div className="flex flex-col gap-2">
                  <div className="flex gap-1 items-start">
                    <label className="typography-r-12-20 text-gray-800">
                      이메일
                    </label>
                    <span className="typography-me-16-24 text-brand-error">
                      *
                    </span>
                  </div>
                  <Input
                    variant="form"
                    type="email"
                    placeholder="이메일을 입력해 주세요."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                  />
                </div>

                {/* Name Field */}
                <div className="flex flex-col gap-2">
                  <div className="flex gap-1 items-start">
                    <label className="typography-r-12-20 text-gray-800">
                      이름
                    </label>
                    <span className="typography-me-16-24 text-brand-error">
                      *
                    </span>
                  </div>
                  <Input
                    variant="form"
                    type="text"
                    placeholder="이름을 입력해 주세요."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isLoading}
                  />
                </div>

                {/* Password Field */}
                <div className="flex flex-col gap-2">
                  <div className="flex gap-1 items-start">
                    <label className="typography-r-12-20 text-gray-800">
                      비밀번호
                    </label>
                    <span className="typography-me-16-24 text-brand-error">
                      *
                    </span>
                  </div>
                  <Input
                    variant="form"
                    type="password"
                    placeholder="비밀번호를 입력해 주세요."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                </div>

                {/* Password Confirmation Field */}
                <div className="flex flex-col gap-2">
                  <div className="flex gap-1 items-start">
                    <label className="typography-r-12-20 text-gray-800">
                      비밀번호 확인
                    </label>
                    <span className="typography-me-16-24 text-brand-error">
                      *
                    </span>
                  </div>
                  <Input
                    variant="form"
                    type="password"
                    placeholder="비밀번호를 한번 더 입력해 주세요."
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    disabled={isLoading}
                  />
                </div>

                {/* Signup Button */}
                <Button
                  variant="primary"
                  size="m"
                  className="w-full mt-2"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? '처리 중...' : '회원가입'}
                </Button>
              </form>
            </div>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <Link
              href="/login"
              className="text-gray-600 typography-me-16-24 hover:text-gray-800"
            >
              로그인
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side - Background Image */}
      <div className="flex-1 relative">
        <Image
          src="/images/signuplogin-bg.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  )
}
