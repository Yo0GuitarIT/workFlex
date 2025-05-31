import { signInWithPopup, AuthError } from "firebase/auth";

import { auth, provider } from "../lib/firebase";

export const useLogin = () => {
    const handleLogin = async () => {
        try {
            await signInWithPopup(auth, provider);
        } catch (err: unknown) {
            const authError = err as AuthError;
            console.error("登入錯誤", authError);
        }
    };

    return {
        handleLogin,
    };
};
