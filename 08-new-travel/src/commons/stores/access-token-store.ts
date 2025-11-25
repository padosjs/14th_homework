import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AccessTokenState {
    accessToken: string;
    setAccessToken: (token: string) => void;
}

export const useAccessTokenStore = create(
    persist<AccessTokenState>(
        (set) => ({
            accessToken: "",
            setAccessToken: (로그인토큰) => {
                set(() => ({ accessToken: 로그인토큰 }))
            }
        }),
        {
            name: 'access-token-storage',
        }
    )
)