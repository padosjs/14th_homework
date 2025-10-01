"use client"
import { useEffect, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
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
    const { data, loading, error } = useQuery(FETCH_USER_LOGGED_IN);
    const pathname = usePathname();
    const router = useRouter();

    // 배너를 가릴 경로를 정의합니다.
    const pathsToHideBanner = [
        '/boards/new',
        '/boards/',
        '/openapis',
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
        return pathname === path;
    }) || pathsToHideBoth.includes(pathname);

    const shouldHideNavigation = pathsToHideBoth.includes(pathname);

    // // 보호할 경로를 배열로 정의합니다.
    // const protectedPaths = [
    //     '/boards/new',
    //     '/openapis'
    // ];

    // // 현재 경로가 보호된 경로인지 확인
    // const isProtectedPath = protectedPaths.includes(pathname);

    // // 로그인 상태 및 경로를 확인하여 리디렉션하는 useEffect 훅
    // useEffect(() => {
    //     // 로딩이 완료되고, 사용자가 로그인되지 않았으며, 현재 경로가 보호된 경로일 경우
    //     if (!loading && !data?.fetchUserLoggedIn && isProtectedPath) {
    //         alert("로그인 후 이용 가능한 페이지입니다.");
    //         router.push('/login');
    //     }
    // }, [data, loading, pathname, router, isProtectedPath]);

    // // 보호된 경로에서 로딩 중이거나 비로그인 유저인 경우 빈 화면 또는 로딩 화면 표시
    // if (isProtectedPath) {
    //     if (loading) {
    //         return (
    //             <div style={{
    //                 display: 'flex',
    //                 justifyContent: 'center',
    //                 alignItems: 'center',
    //                 height: '100vh'
    //             }}>
    //                 불러오는 중...
    //             </div>
    //         );
    //     }

    //     if (!data?.fetchUserLoggedIn) {
    //         // 이미 리디렉션이 진행 중이므로 빈 화면 표시
    //         return <div></div>;
    //     }
    // }

    return (
        <>
            {!shouldHideNavigation && <Navigation userData={data?.fetchUserLoggedIn} />}
            {!shouldHideBanner && <BannerCarousel />}
            <div>{children}</div>
        </>
    );
}