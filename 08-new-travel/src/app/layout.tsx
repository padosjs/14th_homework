import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ApolloSetting from "@/commons/settings/apollo-setting";
import Layout from "@/commons/layout";

// Pretendard Variable 폰트를 로컬에서 불러옵니다.
const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "100 900", // 100부터 900까지 모든 굵기를 지정합니다.
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

export const metadata: Metadata = {
  title: "트립토크 여행게시판",
  description: "여행을 사랑하는 사람들의 커뮤니티. 특별한 숙소를 예약하고 여행 경험을 공유하세요.",

  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
    siteName: "트립토크",
    title: "트립토크 여행게시판 - 여행자들의 특별한 숙소 예약",
    description: "여행을 사랑하는 사람들의 커뮤니티. 특별한 숙소를 예약하고 여행 경험을 공유하세요.",
    images: [
      {
        url: `${siteUrl}/assets/images/bannerB.jpg`,
        width: 2912,
        height: 1632,
        alt: "트립토크 여행게시판 - 당신의 특별한 여행을 시작하세요",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "트립토크 여행게시판 - 여행자들의 특별한 숙소 예약",
    description: "여행을 사랑하는 사람들의 커뮤니티. 특별한 숙소를 예약하고 여행 경험을 공유하세요.",
    images: [`${siteUrl}/assets/images/bannerB.jpg`],
  },
};

interface IProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: IProps) {
  return (
    <html lang="en">
      <body className={`${pretendard.variable} antialiased`}>
        <ApolloSetting>
          <Layout>{children}</Layout>
        </ApolloSetting>
      </body>
    </html>
  );
}