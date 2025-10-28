import Link from 'next/link';
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

export default function MagazinesPage() {
  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-12">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              IT 매거진
            </h1>
            <p className="text-gray-600">
              최신 기술 트렌드와 인사이트를 전합니다
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/auth/login"
              className="relative h-11 px-5 pl-12 bg-white text-gray-500 rounded-lg hover:bg-gray-50 transition flex items-center justify-center text-[15px]"
            >
              <svg
                className="absolute left-[21px] top-1/2 -translate-y-1/2 w-[18px] h-[18px]"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.5 12.75L11.25 9L7.5 5.25"
                  stroke="#6B7280"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.25 9H2.25"
                  stroke="#6B7280"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.25 2.25H14.25C14.6478 2.25 15.0294 2.40804 15.3107 2.68934C15.592 2.97064 15.75 3.35218 15.75 3.75V14.25C15.75 14.6478 15.592 15.0294 15.3107 15.3107C15.0294 15.592 14.6478 15.75 14.25 15.75H11.25"
                  stroke="#6B7280"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              로그인
            </Link>
            <Link
              href="/magazines/new"
              className="relative h-11 px-5 pl-12 bg-gray-700 border border-gray-700 text-white rounded-lg hover:bg-gray-600 transition flex items-center justify-center text-[15px]"
            >
              <svg
                className="absolute left-[21px] top-1/2 -translate-y-1/2 w-[18px] h-[18px]"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 2.25H3.75C3.35218 2.25 2.97064 2.40804 2.68934 2.68934C2.40804 2.97064 2.25 3.35218 2.25 3.75V14.25C2.25 14.6478 2.40804 15.0294 2.68934 15.3107C2.97064 15.592 3.35218 15.75 3.75 15.75H14.25C14.6478 15.75 15.0294 15.592 15.3107 15.3107C15.592 15.0294 15.75 14.6478 15.75 14.25V9"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.7812 1.96875C14.0796 1.67038 14.4843 1.50276 14.9062 1.50276C15.3282 1.50276 15.7329 1.67038 16.0312 1.96875C16.3296 2.26712 16.4972 2.67179 16.4972 3.09375C16.4972 3.51571 16.3296 3.92038 16.0312 4.21875L9.2715 10.9793C9.09341 11.1572 8.8734 11.2874 8.63175 11.358L6.477 11.988C6.41246 12.0068 6.34405 12.008 6.27893 11.9913C6.21381 11.9746 6.15437 11.9407 6.10683 11.8932C6.0593 11.8456 6.02542 11.7862 6.00873 11.7211C5.99205 11.6559 5.99318 11.5875 6.012 11.523L6.642 9.36825C6.71289 9.12679 6.8434 8.90704 7.0215 8.72925L13.7812 1.96875Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              글쓰기
            </Link>
            <Link
              href="/payments"
              className="relative h-11 px-5 pl-12 text-white rounded-lg hover:opacity-90 transition flex items-center justify-center text-[15px]"
              style={{ background: 'linear-gradient(109deg, #8B5CF6 0%, #6366F1 100%)' }}
            >
              <svg
                className="absolute left-[21px] top-1/2 -translate-y-1/2 w-[18px] h-[18px]"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.26275 2.1105C8.29489 1.93845 8.38618 1.78306 8.52082 1.67124C8.65547 1.55942 8.82498 1.4982 9 1.4982C9.17502 1.4982 9.34453 1.55942 9.47918 1.67124C9.61382 1.78306 9.70511 1.93845 9.73725 2.1105L10.5255 6.279C10.5815 6.57536 10.7255 6.84796 10.9388 7.06123C11.152 7.27449 11.4246 7.41852 11.721 7.4745L15.8895 8.26275C16.0615 8.29489 16.2169 8.38618 16.3288 8.52082C16.4406 8.65547 16.5018 8.82498 16.5018 9C16.5018 9.17502 16.4406 9.34453 16.3288 9.47918C16.2169 9.61382 16.0615 9.70511 15.8895 9.73725L11.721 10.5255C11.4246 10.5815 11.152 10.7255 10.9388 10.9388C10.7255 11.152 10.5815 11.4246 10.5255 11.721L9.73725 15.8895C9.70511 16.0615 9.61382 16.2169 9.47918 16.3288C9.34453 16.4406 9.17502 16.5018 9 16.5018C8.82498 16.5018 8.65547 16.4406 8.52082 16.3288C8.38618 16.2169 8.29489 16.0615 8.26275 15.8895L7.4745 11.721C7.41852 11.4246 7.27449 11.152 7.06123 10.9388C6.84796 10.7255 6.57536 10.5815 6.279 10.5255L2.1105 9.73725C1.93845 9.70511 1.78306 9.61382 1.67124 9.47918C1.55942 9.34453 1.4982 9.17502 1.4982 9C1.4982 8.82498 1.55942 8.65547 1.67124 8.52082C1.78306 8.38618 1.93845 8.29489 2.1105 8.26275L6.279 7.4745C6.57536 7.41852 6.84796 7.27449 7.06123 7.06123C7.27449 6.84796 7.41852 6.57536 7.4745 6.279L8.26275 2.1105Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15 1.5V4.5"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16.5 3H13.5"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 16.5C3.82843 16.5 4.5 15.8284 4.5 15C4.5 14.1716 3.82843 13.5 3 13.5C2.17157 13.5 1.5 14.1716 1.5 15C1.5 15.8284 2.17157 16.5 3 16.5Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              구독하기
            </Link>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {magazines.map((magazine) => (
            <Link
              key={magazine.id}
              href={`/magazines/${magazine.id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="relative w-full h-[200px]">
                <img
                  src={magazine.imageUrl}
                  alt={magazine.title}
                  className="w-full h-full object-cover"
                />
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span
                    className={`${
                      categoryColors[magazine.category]
                    } text-white px-4 py-1.5 rounded-full text-sm font-medium`}
                  >
                    {magazine.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col flex-1">
                {/* Title */}
                <h2 className="text-base font-bold text-gray-900 mb-2 line-clamp-2">
                  {magazine.title}
                </h2>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1">
                  {magazine.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {magazine.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
