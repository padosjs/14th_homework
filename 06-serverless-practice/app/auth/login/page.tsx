'use client';

import Link from 'next/link';

export default function LoginPage() {
  const handleGoogleLogin = () => {
    console.log('Google 로그인 시도');
    alert('Google 로그인 기능은 준비 중입니다.');
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-6"
      style={{ background: 'linear-gradient(0deg, #F9FAFB 0%, #F9FAFB 100%), #FFF' }}
    >
      <div className="w-[420px] bg-white shadow-2xl rounded-2xl p-10">
        {/* Brand Icon */}
        <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-5xl">📚</span>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            IT 매거진
          </h1>
          <p className="text-[22.5px] text-gray-700 mb-2 leading-relaxed">
            최신 기술 트렌드와 인사이트를 한곳에서
          </p>
          <p className="text-[21px] text-gray-600 leading-relaxed">
            로그인하고 개인 맞춤형 콘텐츠를 추천받으세요
          </p>
        </div>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-[340px] h-[52.5px] mx-auto flex items-center justify-center gap-3 border border-gray-300 rounded-md hover:bg-gray-50 transition text-gray-700 font-medium mb-6"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span className="text-base">Google로 계속하기</span>
        </button>

        {/* Divider */}
        <div className="relative flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-gray-500 text-sm bg-white">또는</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Guest Button */}
        <Link
          href="/magazines"
          className="w-[340px] h-[52.5px] mx-auto flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50 transition text-gray-700 font-medium text-base mb-6"
        >
          로그인 없이 무료 콘텐츠 둘러보기
        </Link>

        {/* Terms */}
        <p className="text-center text-[18px] text-gray-500 mb-8">
          로그인하면{' '}
          <a href="#" className="text-blue-600 underline hover:text-blue-700">
            이용약관
          </a>{' '}
          및{' '}
          <a href="#" className="text-blue-600 underline hover:text-blue-700">
            개인정보처리방침
          </a>
          에 동의하게 됩니다
        </p>

        {/* Benefits Divider */}
        <div className="border-t border-gray-200 pt-6">
          {/* Benefits List */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-green-500 text-xl">✓</span>
              <span className="text-[21px] text-gray-700">무료 회원가입</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-green-500 text-xl">✓</span>
              <span className="text-[21px] text-gray-700">
                맞춤형 콘텐츠 추천
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-green-500 text-xl">✓</span>
              <span className="text-[21px] text-gray-700">북마크 & 저장</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
