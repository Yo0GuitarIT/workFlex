import { signInWithPopup, signOut } from "firebase/auth";
import { useLocation, useNavigate } from "react-router";

import { auth, provider } from "../lib/firebase";

const whitelist = import.meta.env.VITE_APP_EMAIL_WHITELIST?.split(",") || [];

function Login() {
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
            }

            navigate(from, { replace: true });
        } catch (err) {
            console.error("登入錯誤", err);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <button
                onClick={handleLogin}
                className="rounded-xl bg-blue-500 px-4 py-2 text-white shadow-md hover:bg-blue-600"
            >
                使用 Google 登入
            </button>
        </div>
    );
}

export default Login;
