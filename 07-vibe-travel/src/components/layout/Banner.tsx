"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  Autoplay,
  CarouselDots,
} from "@/components/ui/carousel";

export function Banner() {
  return (
    <section className="w-full h-[480px] bg-gray-400 flex items-center justify-center relative">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000, // 5초마다 자동 넘김
            stopOnInteraction: false, // 사용자 조작 후에도 자동 넘김 계속
            stopOnMouseEnter: true, // 호버 시 일시 정지
            stopOnFocusIn: true, // 포커스 시 일시 정지 (접근성)
          }),
        ]}
        className="w-full h-full"
      >
        <CarouselContent className="ml-0 h-[480px]">
          <CarouselItem className="pl-0">
            <div className="relative w-full h-[480px]">
              <Image
                src="/images/banner1.png"
                alt="Banner 1"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/25" />
            </div>
          </CarouselItem>
          <CarouselItem className="pl-0">
            <div className="relative w-full h-[480px]">
              <Image
                src="/images/banner2.png"
                alt="Banner 2"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/25" />
            </div>
          </CarouselItem>
          <CarouselItem className="pl-0">
            <div className="relative w-full h-[480px]">
              <Image
                src="/images/banner3.png"
                alt="Banner 3"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/25" />
            </div>
          </CarouselItem>
        </CarouselContent>
        {/* Navigation buttons removed - carousel now only uses autoplay */}
        <CarouselDots className="absolute bottom-5 left-1/2 -translate-x-1/2" />
      </Carousel>
    </section>
  );
}
