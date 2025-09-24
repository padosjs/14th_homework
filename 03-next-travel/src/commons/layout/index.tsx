"use client"

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Navigation from "@/commons/layout/navigation";
import BannerCarousel from "@/commons/layout/banner";
import { gql, useQuery } from "@apollo/client"

const FETCH_USER_LOGGED_IN = gql`
    query {
        fetchUserLoggedIn {
            _id
            email
            name
        }
    }
`

interface IProps { children: ReactNode; }

export default function Layout({ children }: IProps) {
    // useQuery를 통해 가져온 데이터는 data.fetchUserLoggedIn에 저장됩니다.
    const { data } = useQuery(FETCH_USER_LOGGED_IN);
    const pathname = usePathname();

    const pathsToHideBanner = [
        '/boards/new',
        '/boards/',
        '/openapis',
    ];

    const pathsToHideBoth = [
        '/login',
        '/signup',
    ];

    const shouldHideBanner = pathsToHideBanner.some(path => {
        if (path === '/boards/') {
            return pathname.startsWith(path) && pathname.endsWith('/edit');
        }
        return pathname === path;
    }) || pathsToHideBoth.includes(pathname);

    const shouldHideNavigation = pathsToHideBoth.includes(pathname);

    return (
        <>
            {/* shouldHideNavigation이 false일 때만 Navigation을 렌더링합니다. */}
            {/* data.fetchUserLoggedIn을 prop으로 전달합니다. */}
            {!shouldHideNavigation && <Navigation userData={data?.fetchUserLoggedIn} />}
            {/* shouldHideBanner가 false일 때만 BannerCarousel을 렌더링합니다. */}
            {!shouldHideBanner && <BannerCarousel />}
            <div>{children}</div>
        </>
    );
}