'use client';

import Link from 'next/link';
import { useState, FormEvent } from 'react';
import { Category } from '@/types/magazine';

const categories: Category[] = [
  '인공지능',
  '웹개발',
  '클라우드',
  '보안',
  '모바일',
  '데이터사이언스',
  '블록체인',
  'DevOps',
];

export default function NewMagazinePage() {
  const [formData, setFormData] = useState({
    category: '' as Category | '',
    title: '',
    description: '',
    content: '',
    tags: '',
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('폼이 제출되었습니다! (콘솔을 확인하세요)');
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
            새 아티클 등록
          </h1>
          <p className="text-gray-600">
            IT 매거진에 새로운 기술 아티클을 등록합니다
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-10">
          {/* Image Upload */}
          <div className="mb-8">
            <label className="block text-base font-bold text-gray-900 mb-2">
              이미지 파일
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-gray-400 transition cursor-pointer">
              <div className="flex flex-col items-center gap-3">
                <div className="text-5xl text-gray-400">📷</div>
                <div className="text-lg text-gray-700">
                  클릭하여 이미지 선택
                </div>
                <div className="text-sm text-gray-500">또는 드래그 앤 드롭</div>
                <div className="text-xs text-gray-400">
                  JPG, PNG, GIF (최대 10MB)
                </div>
              </div>
            </div>
          </div>

          {/* Category */}
          <div className="mb-8">
            <label className="block text-base font-bold text-gray-900 mb-2">
              카테고리 <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value as Category })
              }
              className="w-full h-12 px-4 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">카테고리를 선택해주세요</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div className="mb-8">
            <label className="block text-base font-bold text-gray-900 mb-2">
              제목
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="예: 2025년 AI 트렌드: 생성형 AI의 진화"
              className="w-full h-12 px-4 border border-gray-300 rounded-md text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Description */}
          <div className="mb-8">
            <label className="block text-base font-bold text-gray-900 mb-2">
              한줄 소개
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="아티클을 간단히 소개해주세요 (1-2문장)"
              className="w-full h-12 px-4 border border-gray-300 rounded-md text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Content */}
          <div className="mb-8">
            <label className="block text-base font-bold text-gray-900 mb-2">
              상세 내용
            </label>
            <textarea
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              placeholder="아티클의 상세 내용을 작성해주세요..."
              rows={10}
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-900 placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Tags */}
          <div className="mb-8">
            <label className="block text-base font-bold text-gray-900 mb-2">
              태그
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) =>
                setFormData({ ...formData, tags: e.target.value })
              }
              placeholder="#React #TypeScript #JavaScript"
              className="w-full h-12 px-4 border border-gray-300 rounded-md text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <p className="mt-2 text-sm text-gray-500">
              태그를 # 기호와 함께 입력해주세요 (공백으로 구분)
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-14 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition font-medium text-base"
          >
            아티클 등록하기
          </button>
        </form>
      </div>
    </div>
  );
}
