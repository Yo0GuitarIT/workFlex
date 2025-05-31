import { signOut, signInWithPopup, AuthError } from "firebase/auth";
import { useLocation, useNavigate } from "react-router";

import { auth, provider } from "../lib/firebase";

const whitelist = import.meta.env.VITE_APP_EMAIL_WHITELIST?.split(",") || [];

export const useLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // 如果有來自 ProtectedRoute 的 `state.from`，則使用它，否則預設導向 "/"
    const from = location.state?.from?.pathname || "/";

    const handleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const email = result.user.email;

            // 如果使用者的 email 不在 whitelist 中，則登出
            if (!email || !whitelist.includes(email)) {
                alert("你沒有權限登入");
                await signOut(auth);
                return;
            }

            navigate(from, { replace: true });
        } catch (err: unknown) {
            const authError = err as AuthError;
            console.error("登入錯誤", authError);
        }
    };

    return {
        handleLogin,
    };
};
