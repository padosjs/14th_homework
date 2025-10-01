import { useRouter } from "next/navigation"
import { useEffect, ComponentType, useRef } from "react"

export const withAuth = <P extends object>(
    Component: ComponentType<P>
) => {
    return (props: P) => {
        const router = useRouter()
        const hasChecked = useRef(false)

        useEffect(() => {
            if (!localStorage.getItem("accessToken") && !hasChecked.current) {
                hasChecked.current = true
                alert("로그인 후 이용 가능합니다.")
                router.push("/login")
            }
        }, [router])

        return <Component {...props} />
    }
}