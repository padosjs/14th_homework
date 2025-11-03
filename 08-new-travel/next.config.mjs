/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'tong.visitkorea.or.kr',
          port: '',
          pathname: '/**',
        },
        // https도 필요 시 추가
        {
          protocol: 'https',
          hostname: 'tong.visitkorea.or.kr',
          port: '',
          pathname: '/**',
        },
      ],
    },
  }

export default nextConfig;
