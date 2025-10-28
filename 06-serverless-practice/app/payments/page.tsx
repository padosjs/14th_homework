'use client';

import Link from 'next/link';

export default function SubscribePage() {
  const handleSubscribe = () => {
    console.log('구독 신청');
    alert('구독 기능은 준비 중입니다. (콘솔을 확인하세요)');
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-[700px] mx-auto px-6">
        {/* Back Button */}
        <Link
          href="/magazines"
          className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-8 text-sm"
        >
          <span>←</span>
          <span>목록으로</span>
        </Link>

        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            IT 매거진 구독
          </h1>
          <p className="text-gray-600 text-lg">
            프리미엄 콘텐츠를 제한 없이 이용하세요
          </p>
        </div>

        {/* Subscription Plan Card */}
        <div className="w-[552px] mx-auto bg-white shadow-lg rounded-xl p-10">
          {/* Plan Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              월간 구독
            </h2>
            <p className="text-[22.5px] text-gray-600">
              모든 IT 매거진 콘텐츠에 무제한 접근
            </p>
          </div>

          {/* Price */}
          <div className="text-center my-12">
            <div className="flex items-end justify-center gap-2">
              <span className="text-7xl font-bold text-gray-900">9,900원</span>
              <span className="text-3xl text-gray-600 pb-2">/월</span>
            </div>
          </div>

          {/* Benefits List */}
          <div className="space-y-[62.5px] my-16">
            <div className="flex items-center gap-4">
              <span className="text-green-500 text-2xl">✓</span>
              <span className="text-[21px] text-gray-700">
                모든 프리미엄 아티클 열람
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-green-500 text-2xl">✓</span>
              <span className="text-[21px] text-gray-700">
                최신 기술 트렌드 리포트
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-green-500 text-2xl">✓</span>
              <span className="text-[21px] text-gray-700">
                광고 없는 읽기 환경
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-green-500 text-2xl">✓</span>
              <span className="text-[21px] text-gray-700">
                언제든지 구독 취소 가능
              </span>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleSubscribe}
            className="w-[408px] h-[58px] mx-auto block bg-gray-900 text-white rounded-md hover:bg-gray-800 transition font-medium text-base"
          >
            구독하기
          </button>
        </div>
      </div>
    </div>
  );
}
