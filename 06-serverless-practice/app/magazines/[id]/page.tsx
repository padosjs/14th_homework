import Link from 'next/link';
import { notFound } from 'next/navigation';
import { magazines } from '@/lib/data';
import { Category } from '@/types/magazine';

const categoryColors: Record<Category, string> = {
  인공지능: 'bg-category-ai',
  웹개발: 'bg-category-web',
  클라우드: 'bg-category-cloud',
  보안: 'bg-category-security',
  모바일: 'bg-category-mobile',
  데이터사이언스: 'bg-category-data',
  블록체인: 'bg-category-blockchain',
  DevOps: 'bg-category-devops',
};

interface PageProps {
  params: {
    id: string;
  };
}

export default function MagazineDetailPage({ params }: PageProps) {
  const magazine = magazines.find((m) => m.id === params.id);

  if (!magazine) {
    notFound();
  }

  const contentParagraphs = magazine.content.split('\n\n');

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-[900px] mx-auto px-6">
        {/* Back Button */}
        <Link
          href="/magazines"
          className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-8 text-sm"
        >
          <span>←</span>
          <span>목록으로</span>
        </Link>

        {/* Article Detail */}
        <article>
          {/* Hero Image */}
          <div className="relative w-full h-[400px] rounded-lg overflow-hidden mb-10">
            <img
              src={magazine.imageUrl}
              alt={magazine.title}
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            {/* Category Badge */}
            <div className="absolute top-5 left-5">
              <span
                className={`${
                  categoryColors[magazine.category]
                } text-white px-5 py-2 rounded-full text-base font-medium`}
              >
                {magazine.category}
              </span>
            </div>
          </div>

          {/* Date */}
          <p className="text-gray-500 text-sm mb-6">
            {new Date(magazine.date).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {magazine.title}
          </h1>

          {/* Subtitle / Description with borders */}
          <div className="border-t border-b border-gray-200 py-4 mb-10">
            <p className="text-lg text-gray-700">{magazine.description}</p>
          </div>

          {/* Content Paragraphs */}
          <div className="space-y-6 text-gray-800 leading-relaxed">
            {contentParagraphs.map((paragraph, index) => (
              <p key={index} className="text-base">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags */}
          <div className="border-t border-gray-200 mt-12 pt-8">
            <div className="flex flex-wrap gap-2">
              {magazine.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3.5 py-2 bg-gray-100 text-gray-700 text-sm rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </article>

        {/* Back to List Button */}
        <div className="mt-16 text-center">
          <Link
            href="/magazines"
            className="inline-block px-8 py-3 bg-gray-100 text-gray-900 rounded-md hover:bg-gray-200 transition text-sm font-medium"
          >
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
