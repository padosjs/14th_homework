"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Mypage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/mypage/history");
  }, [router]);

  return null;
}