"use client"
import { useEffect, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Navigation from "@/commons/layout/navigation";
import BannerCarousel from "@/commons/layout/banner";
import PointChargeModal from "@/components/point-charge-modal";
import { gql, useQuery } from "@apollo/client"

const FETCH_USER_LOGGED_IN = gql`
    query {
        fetchUserLoggedIn {
            _id
            email
            name
            userPoint {
                _id
                amount
            }
        }
    }
`

interface IProps { children: ReactNode; }

export default function Layout({ children }: IProps) {
    const { data, loading, error } = useQuery(FETCH_USER_LOGGED_IN);
    const pathname = usePathname();
    const router = useRouter();

    // 배너를 가릴 경로를 정의합니다.
    const pathsToHideBanner = [
        '/boards/new',
        '/boards/',
        '/openapis',
        '/mypage',
        '/trips/new',
        '/trips/',
        '/',
    ];

    // 배너와 내비게이션 모두 가릴 경로를 정의합니다.
    const pathsToHideBoth = [
        '/login',
        '/signup',
    ];

    const shouldHideBanner = pathsToHideBanner.some(path => {
        if (path === '/boards/') {
            return pathname.startsWith(path) && pathname.endsWith('/edit');
        }
        // /mypage 경로 및 하위 경로를 모두 가리기
        if (path === '/mypage') {
            return pathname === path || pathname.startsWith(path + '/');
        }
        // /trips/ 경로 및 하위 경로를 모두 가리기
        if (path === '/trips/') {
            return pathname.startsWith(path);
        }
        return pathname === path;
    }) || pathsToHideBoth.includes(pathname);

    const shouldHideNavigation = pathsToHideBoth.includes(pathname);


    return (
        <>
            {!shouldHideNavigation && <Navigation userData={data?.fetchUserLoggedIn} />}
            {!shouldHideBanner && <BannerCarousel />}
            <div>{children}</div>
            <PointChargeModal />
        </>
    );
}