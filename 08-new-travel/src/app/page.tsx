import Link from "next/link";
import Button from '@/components/button/button';

export default function Home() {
  return (
    <div className="w-full max-w-[40rem] mx-auto p-8">
      작업된 페이지:
      <br />
      <br />
      <div className="flex flex-col gap-4">
        <Link href="/boards/"><Button className="white-button" text="게시글 목록 페이지" /></Link>
        <Link href="/boards/new"><Button className="white-button" text="게시글 등록 페이지" /></Link>
        <Link href="/boards/68bace9fe43aaf002915260a"><Button className="white-button" text="게시글 상세 페이지" /></Link>
        <Link href="/openapis"><Button className="white-button" text="오픈 API" /></Link>
        <Link href="/login"><Button className="white-button" text="로그인" /></Link>
        <Link href="/signup"><Button className="white-button" text="회원가입" /></Link>
        <Link href="/mypage"><Button className="white-button" text="마이페이지" /></Link>
        <Link href="/trips/new"><Button className="white-button" text="여행 상품 등록" /></Link>
        <Link href="/trips/1"><Button className="white-button" text="여행 상품 상세" /></Link>
        <Link href="/trips"><Button className="white-button" text="여행 상품 목록" /></Link>
      </div>
    </div>
  );
}