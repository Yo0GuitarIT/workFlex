import { Button, Title } from "@mantine/core";
import { SignInIcon } from "@phosphor-icons/react";
import { signOut } from "firebase/auth";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

import { signInWithGoogle, handleRedirectResult } from "../lib/auth";
import { auth } from "../lib/firebase";

const whitelist = import.meta.env.VITE_APP_EMAIL_WHITELIST?.split(",") || [];

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // 如果有來自 ProtectedRoute 的 `state.from`，則使用它，否則預設導向 "/"
    const from = location.state?.from?.pathname || "/";

    const handleLogin = async () => {
        try {
            // 使用新的統一登入方法
            const result = await signInWithGoogle();

            // 如果是 redirect 方式，result 會是 null，不需要處理
            if (!result) return;

            const email = result.user.email;

            // 如果使用者的 email 不在 whitelist 中，則登出
            if (!email || !whitelist.includes(email)) {
                alert("你沒有權限登入");
                await signOut(auth);
                return;
            }

            navigate(from, { replace: true });
        } catch (err: unknown) {
            console.error("登入錯誤", err);

            // 處理特定的 Firebase 錯誤
            const error = err as { code?: string };
            if (error.code === "auth/popup-blocked") {
                alert("彈出視窗被阻擋，請允許彈出視窗後重試");
            } else if (error.code === "auth/popup-closed-by-user") {
                // 使用者取消登入，不需要顯示錯誤
                console.log("使用者取消登入");
            } else if (error.code === "auth/network-request-failed") {
                alert("網路連接失敗，請檢查網路後重試");
            } else {
                alert("登入失敗，請重試");
            }
        }
    };

    // 處理頁面加載時的 redirect 結果
    useEffect(() => {
        const checkRedirectResult = async () => {
            try {
                const result = await handleRedirectResult();
                if (result) {
                    const email = result.user.email;

                    // 檢查 whitelist
                    if (!email || !whitelist.includes(email)) {
                        alert("你沒有權限登入");
                        await signOut(auth);
                        return;
                    }

                    navigate(from, { replace: true });
                }
            } catch (error) {
                console.error("處理 redirect 結果錯誤:", error);
            }
        };

        checkRedirectResult();
    }, [navigate, from]);

    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center gap-6 bg-gray-100">
            <Title>屏東縣小編打卡系統</Title>
            <Button
                rightSection={<SignInIcon size={16} />}
                onClick={handleLogin}
            >
                Google 登入
            </Button>
        </div>
    );
};

export default Login;
