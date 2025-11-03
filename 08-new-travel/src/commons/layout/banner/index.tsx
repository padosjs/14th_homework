"use client"

// Swiper 컴포넌트 불러오기
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './styles.module.css';
import Image from 'next/image';

export default function BannerCarousel() {

    return (
        <>
            <Swiper
                className={styles.myCustomSwiper}
                slidesPerView={1}
                modules={[Autoplay, Pagination]}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false
                }}
                speed={1000} 
                loop={true}
                pagination={{
                    clickable: true
                }}
            >
                <SwiperSlide>
                    <div className={`${styles.imageContainer} ${styles.dimOverlay}`}>
                        <Image
                            src="/assets/images/bannerA.jpg"
                            alt='배너A'
                            width={0}
                            height={0}
                            sizes='100vw'
                            className={styles.bannerImage}
                        />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={`${styles.imageContainer} ${styles.dimOverlay}`}>
                        <Image
                            src="/assets/images/bannerB.jpg"
                            alt='배너B'
                            width={0}
                            height={0}
                            sizes='100vw'
                            className={styles.bannerImage}
                        />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={`${styles.imageContainer} ${styles.dimOverlay}`}>
                        <Image
                            src="/assets/images/bannerC.jpg"
                            alt='배너C'
                            width={0}
                            height={0}
                            sizes='100vw'
                            className={styles.bannerImage}
                        />
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    )
}