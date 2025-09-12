"use client"

import { ReactNode } from 'react';
import Navigation from "@/commons/layout/navigation";
import BannerCarousel from "@/commons/layout/banner";

interface IProps {
    children: ReactNode;
}

export default function Layout({ children }: IProps) {

    return (
        <>
            <Navigation />
            <BannerCarousel />
            <div>{children}</div>
        </>
    )
}