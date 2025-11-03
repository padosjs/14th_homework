import { create } from 'zustand'

export const useAccessTokenStore = create((set) => {

    return {
        accessToken: "",
        setAccessToken: (로그인토큰) => {
            set(() => ({ accessToken: 로그인토큰 }))
        }
    }

})