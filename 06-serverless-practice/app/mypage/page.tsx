'use client';

import Link from 'next/link';

export default function MypagePage() {
  const handleUnsubscribe = () => {
    console.log('구독 취소');
    alert('구독 취소 기능은 준비 중입니다. (콘솔을 확인하세요)');
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-[900px] mx-auto px-6">
        {/* Back Button */}
        <Link
          href="/magazines"
          className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-8 text-sm"
        >
          <span>&larr;</span>
          <span>목록으로</span>
        </Link>

        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            IT 매거진 구독
          </h1>
          <p className="text-gray-600">
            프리미엄 콘텐츠를 제한 없이 이용하세요
          </p>
        </div>

        {/* Content Container */}
        <div className="space-y-6">
          {/* User Profile Section */}
          <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
            {/* Profile Image */}
            <div className="flex justify-center mb-6">
              <div className="relative w-[120px] h-[120px] rounded-full overflow-hidden border-4 border-gray-100 bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop"
                  alt="User Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* User Name */}
            <h2 className="text-base font-bold text-gray-900 mb-2">
              테크러버
            </h2>

            {/* User Description */}
            <p className="text-sm text-gray-500 mb-4">
              최신 IT 트렌드와 개발 이야기를 공유합니다
            </p>

            {/* Join Date */}
            <div className="inline-block bg-gray-50 border border-gray-200 rounded px-3 py-2">
              <p className="text-xs text-gray-500">가입일 2024.03</p>
            </div>
          </div>

          {/* Subscription Plan Section */}
          <div className="bg-white border-2 border-emerald-500 rounded-2xl p-8">
            {/* Plan Header */}
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-base font-bold text-gray-900">
                구독 플랜
              </h3>
              <div className="bg-emerald-500 text-white px-3 py-2 rounded-lg">
                <p className="text-xs font-bold">구독중</p>
              </div>
            </div>

            {/* Plan Details */}
            <div className="mb-8">
              {/* Plan Name */}
              <h2 className="text-2xl font-bold text-emerald-700 mb-6">
                IT Magazine Premium
              </h2>

              {/* Benefits List */}
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <svg
                    className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 11-1.06-1.06l7.25-7.25a.75.75 0 011.06 0Z" />
                    <path d="M2.22 9.22a.75.75 0 010 1.06l-1.25 1.25a.75.75 0 11-1.06-1.06l1.25-1.25a.75.75 0 011.06 0Z" />
                  </svg>
                  <span className="text-sm text-emerald-800">
                    모든 프리미엄 콘텐츠 무제한 이용
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 11-1.06-1.06l7.25-7.25a.75.75 0 011.06 0Z" />
                    <path d="M2.22 9.22a.75.75 0 010 1.06l-1.25 1.25a.75.75 0 11-1.06-1.06l1.25-1.25a.75.75 0 011.06 0Z" />
                  </svg>
                  <span className="text-sm text-emerald-800">
                    매주 새로운 IT 트렌드 리포트
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 11-1.06-1.06l7.25-7.25a.75.75 0 011.06 0Z" />
                    <path d="M2.22 9.22a.75.75 0 010 1.06l-1.25 1.25a.75.75 0 11-1.06-1.06l1.25-1.25a.75.75 0 011.06 0Z" />
                  </svg>
                  <span className="text-sm text-emerald-800">
                    광고 없는 깔끔한 읽기 환경
                  </span>
                </li>
              </ul>

              {/* Unsubscribe Button */}
              <button
                onClick={handleUnsubscribe}
                className="h-11 px-5 bg-white border border-gray-200 text-gray-500 rounded-lg hover:bg-gray-50 transition flex items-center justify-center text-sm"
              >
                구독 취소
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
