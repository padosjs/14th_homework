'use client';

import { useDaumPostcodePopup } from 'react-daum-postcode';
import type { Address } from 'react-daum-postcode';
import { useState, useEffect } from 'react';
import styles from './styles.module.css'

interface IPostcodeProps {
    onAddressComplete: (address: string, zipcode: string, latitude?: number, longitude?: number) => void;
}

export default function Postcode(props: IPostcodeProps) {
    const open = useDaumPostcodePopup();
    const [isLoading, setIsLoading] = useState(false);
    const [apiReady, setApiReady] = useState(false);

    // 카카오 맵 API 로드 (services 라이브러리 포함)
    useEffect(() => {
        const loadKakaoMapScript = () => {
            return new Promise<void>((resolve, reject) => {
                // 이미 로드되어 있고 services가 있는지 확인
                if (window.kakao?.maps?.services?.Geocoder) {
                    resolve();
                    return;
                }

                // script 태그가 이미 존재하는지 확인
                const existingScript = document.querySelector(
                    'script[src*="dapi.kakao.com/v2/maps/sdk.js"]'
                );

                if (existingScript) {
                    // 기존 스크립트가 있으면 load() 콜백으로 초기화 대기
                    existingScript.addEventListener('load', () => {
                        window.kakao?.maps?.load?.(() => {
                            resolve();
                        });
                    });
                    existingScript.addEventListener('error', reject);
                    return;
                }

                // 새로운 script 태그 생성 (services 라이브러리 포함)
                const script = document.createElement('script');
                script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_API_KEY}&libraries=services&autoload=false`;
                script.async = true;
                script.onload = () => {
                    // autoload=false이므로 load() 콜백 필요
                    window.kakao?.maps?.load?.(() => {
                        resolve();
                    });
                };
                script.onerror = reject;
                document.head.appendChild(script);
            });
        };

        loadKakaoMapScript()
            .then(() => {
                setApiReady(true);
            })
            .catch((error) => {
                console.error('카카오 맵 API 로드 실패:', error);
            });
    }, []);

    // 주소를 위경도로 변환하는 함수
    const convertAddressToCoordinates = (address: string): Promise<{ latitude: number; longitude: number } | null> => {
        return new Promise((resolve) => {
            // 카카오 맵 API가 로드되었는지 확인
            if (!window.kakao?.maps?.services?.Geocoder) {
                console.error('카카오 맵 API가 로드되지 않았습니다.');
                resolve(null);
                return;
            }

            const geocoder = new window.kakao.maps.services.Geocoder();

            geocoder.addressSearch(address, (result: unknown, status: string) => {
                if (status === window.kakao.maps.services.Status.OK && Array.isArray(result) && result.length > 0) {
                    const item = result[0] as { x: string | number; y: string | number };
                    const lat = parseFloat(String(item.y));
                    const lng = parseFloat(String(item.x));
                    resolve({ latitude: lat, longitude: lng });
                } else {
                    console.warn('주소 변환 실패:', address);
                    resolve(null);
                }
            });
        });
    };

    const handleComplete = async (data: Address) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }

        // 위경도 변환
        setIsLoading(true);
        const coords = await convertAddressToCoordinates(fullAddress);
        setIsLoading(false);

        if (coords) {
            props.onAddressComplete(fullAddress, data.zonecode, coords.latitude, coords.longitude);
        } else {
            // 위경도 변환 실패 시에도 기본 주소와 우편번호는 전달
            props.onAddressComplete(fullAddress, data.zonecode);
        }
    };

    const handleClick = () => {
        open({ onComplete: handleComplete });
    };

    return (
        <button
            type="button"
            className={`${styles.button} ${styles['white-button']}`}
            onClick={handleClick}
            disabled={isLoading || !apiReady}
        >
            {isLoading ? '위치 변환 중...' : '우편번호 검색'}
        </button>
    );
};