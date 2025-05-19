import { Button, Title } from "@mantine/core";
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
        <div className="flex gap-6 h-screen w-screen flex-col items-center justify-center">
            <Title>屏東縣小編打卡系統</Title>
            <Button onClick={handleLogin}>使用 Google 登入</Button>
        </div>
    );
}

export default Login;
