'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useMutation } from '@apollo/client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { LOGIN_USER } from '@/lib/graphql'
import { useAuth } from '@/lib/auth/AuthContext'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [loginUser] = useMutation(LOGIN_USER)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // 유효성 검사
    if (!email || !password) {
      setError('이메일과 비밀번호를 입력해주세요.')
      return
    }

    try {
      setIsLoading(true)
      const result = await loginUser({
        variables: {
          email,
          password,
        },
      })

      const accessToken = result.data?.loginUser?.accessToken
      if (accessToken) {
        // AuthContext와 localStorage에 토큰 저장
        login(accessToken)
        // 홈으로 리다이렉트
        router.push('/')
      } else {
        setError('로그인에 실패했습니다.')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '로그인에 실패했습니다.'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-screen h-screen bg-white flex">
      {/* Left Side - Login Form */}
      <div className="w-[400px] bg-white flex flex-col items-center justify-center px-10">
        {/* Logo Area */}
        <Link href="/">
          <div className="w-[120px] h-[80px] mb-6 flex items-center justify-center cursor-pointer">
            <Image
              src="/images/logo-black.svg"
              alt="Trip Trip Logo"
              width={120}
              height={80}
              priority
            />
          </div>
        </Link>

        {/* Welcome Message */}
        <h2 className="text-center mb-8 typography-b-20-28 text-gray-900">
          트립트립에 오신걸 환영합니다.
        </h2>

        {/* Form Section */}
        <div className="w-[320px]">
          <div className="mb-1">
            <p className="text-center typography-me-16-24 text-gray-800 mb-4">
              트립트립에 로그인 하세요.
            </p>

            {/* Error Message */}
            {error && (
              <div className="w-full p-3 mb-4 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin}>
              {/* Email Input */}
              <div className="mb-3 flex flex-col gap-2">
                <Input
                  variant="form"
                  type="email"
                  placeholder="이메일을 입력해주세요"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              {/* Password Input */}
              <div className="flex flex-col gap-2">
                <Input
                  variant="form"
                  type="password"
                  placeholder="비밀번호를 입력해주세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
                {/* Error Message Area - for error states */}
                <div className="min-h-5" />
              </div>

              {/* Login Button */}
              <Button
                variant="primary"
                size="m"
                className="w-[320px] mb-6"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? '처리 중...' : '로그인'}
              </Button>
            </form>
          </div>

          {/* Signup Link */}
          <div className="text-center">
            <Link
              href="/signup"
              className="text-gray-600 typography-me-16-24 hover:text-gray-800"
            >
              회원가입
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side - Background Image */}
      <div className="flex-1 relative overflow-hidden">
        <Image
          src="/images/signuplogin-bg.jpg"
          alt="Background"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 0vw, 50vw"
          priority
        />
      </div>
    </div>
  )
}
