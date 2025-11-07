import { create } from 'zustand'

interface AccessTokenState {
    accessToken: string;
    setAccessToken: (token: string) => void;
}

export const useAccessTokenStore = create<AccessTokenState>((set) => {

    return {
        accessToken: "",
        setAccessToken: (로그인토큰) => {
            set(() => ({ accessToken: 로그인토큰 }))
        }
    }

})