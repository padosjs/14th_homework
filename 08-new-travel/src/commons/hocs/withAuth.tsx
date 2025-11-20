"use client"

import { useRouter } from "next/navigation"
import { useEffect, ComponentType, useRef } from "react"
import { useAccessTokenStore } from "@/commons/stores/access-token-store"
import { getAccessToken } from "@/commons/libraries/get-access-token"

export const withAuth = <P extends object>(
    Component: ComponentType<P>
) => {
    return (props: P) => {
        const router = useRouter()
        const hasChecked = useRef(false)
        const { accessToken, setAccessToken } = useAccessTokenStore()

        useEffect(() => {
            const checkAuth = async () => {
                if (hasChecked.current) return

                hasChecked.current = true

                // accessToken이 없으면 refreshToken으로 새 토큰 발급 시도
                if (!accessToken) {
                    try {
                        const newAccessToken = await getAccessToken()
                        if (newAccessToken) {
                            setAccessToken(newAccessToken)
                            return
                        }
                    } catch (error) {
                        console.error("토큰 갱신 실패:", error)
                    }
                }

                // 토큰이 없으면 로그인 페이지로 이동
                if (!accessToken) {
                    alert("로그인 후 이용 가능합니다.")
                    router.push("/login")
                }
            }

            checkAuth()
        }, [accessToken, setAccessToken, router])

        return <Component {...props} />
    }
}