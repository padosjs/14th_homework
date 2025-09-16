"use client"

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Navigation from "@/commons/layout/navigation";
import BannerCarousel from "@/commons/layout/banner";

interface IProps {
    children: ReactNode;
}

export default function Layout({ children }: IProps) {
    const pathname = usePathname();

    // BannerCarousel을 숨길 경로 목록을 정의합니다.
    const pathsToHide = [
        '/boards/new',
        // 'boards/[id]/edit'과 같은 동적 경로를 위한 패턴
        '/boards/',
    ];

    // 현재 경로가 숨겨야 하는 경로 목록에 포함되는지 확인합니다.
    // 'boards/[id]/edit'과 같은 동적 경로도 포함됩니다.
    const shouldHideBanner = pathsToHide.some(path => {
        // '/boards/'로 시작하고 '/edit'으로 끝나는 경우를 추가합니다.
        if (path === '/boards/') {
            return pathname.startsWith(path) && pathname.endsWith('/edit');
        }
        // 다른 고정된 경로들을 확인합니다.
        return pathname === path;
    });

    return (
        <>
            <Navigation />
            {/* shouldHideBanner가 false일 때만 BannerCarousel을 렌더링합니다. */}
            {!shouldHideBanner && <BannerCarousel />}
            <div>{children}</div>
        </>
    );
}