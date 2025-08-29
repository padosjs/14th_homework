import Link from "next/link";
import Button from '@/components/button';

export default function Home() {
  return (
    <div>
      메인 페이지입니다!
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      작업된 페이지:
      <br />
      <br />
      <Link href="/boards/new">
        <Button className="white-button" text="게시글 등록 페이지" />
      </Link><br />
      <Link href="/boards/detail">
        <Button className="white-button" text="게시글 상세 페이지" />
      </Link><br />
    </div>
  );
}