import Link from "next/link";
import Button from '@/components/button/button';

export default function Home() {
  return (
    <div className="w-full max-w-[40rem] mx-auto p-8">

      메인 페이지입니다!
      <br />
      <br />
      작업된 페이지:
      <br />
      <br />
      <Link href="/boards/">
        <Button className="white-button" text="게시글 목록 페이지" />
      </Link><br />
      <Link href="/boards/new">
        <Button className="white-button" text="게시글 등록 페이지" />
      </Link><br />
      <Link href="/boards/68bace9fe43aaf002915260a">
        <Button className="white-button" text="게시글 상세 페이지" />
      </Link><br />
      <Link href="/openapis">
        <Button className="white-button" text="오픈 API" />
      </Link><br />
      <Link href="/login">
        <Button className="white-button" text="로그인" />
      </Link><br />
      <Link href="/signup">
        <Button className="white-button" text="회원가입" />
      </Link><br />
    </div>
  );
}