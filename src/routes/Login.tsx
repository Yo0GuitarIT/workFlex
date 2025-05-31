import { Button, Title } from "@mantine/core";
import { SignInIcon } from "@phosphor-icons/react";

import { useLogin } from "../hooks/useLogin";

const Login = () => {
    const { handleLogin } = useLogin();

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
