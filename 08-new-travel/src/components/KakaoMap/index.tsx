"use client";

import { useEffect, useRef } from "react";

interface KakaoMapProps {
  lat?: number;
  lng?: number;
}

// 서울역 좌표
const SEOUL_STATION_LAT = 37.5547125;
const SEOUL_STATION_LNG = 126.9707878;

export default function KakaoMap({ lat, lng }: KakaoMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadKakaoMapScript = () => {
      return new Promise<void>((resolve, reject) => {
        // 이미 로드되어 있는지 확인
        if (window.kakao && window.kakao.maps) {
          resolve();
          return;
        }

        // script 태그가 이미 존재하는지 확인
        const existingScript = document.querySelector(
          'script[src*="dapi.kakao.com/v2/maps/sdk.js"]'
        );

        if (existingScript) {
          existingScript.addEventListener("load", () => resolve());
          existingScript.addEventListener("error", reject);
          return;
        }

        // 새로운 script 태그 생성
        const script = document.createElement("script");
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_API_KEY}&autoload=false`;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const initializeMap = () => {
      if (!mapContainer.current || !window.kakao || !window.kakao.maps) return;

      window.kakao.maps.load(() => {
        // 위도, 경도가 없으면 서울역 좌표 사용
        const latitude = lat ?? SEOUL_STATION_LAT;
        const longitude = lng ?? SEOUL_STATION_LNG;

        const options = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
          level: 3, // 확대 레벨
        };

        const map = new window.kakao.maps.Map(mapContainer.current, options);

        // 마커 생성
        const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });

        marker.setMap(map);
      });
    };

    loadKakaoMapScript()
      .then(() => {
        initializeMap();
      })
      .catch((error) => {
        console.error("카카오 지도 로드 실패:", error);
      });
  }, [lat, lng]);

  return <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />;
}
