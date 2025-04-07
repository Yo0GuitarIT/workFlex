import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../lib/firebase";
import { useNavigate } from "react-router";

const ALLOWED_USER_EMAILS = ["yo0.guitar.it@gmail.com"];

function Login() {
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const email = result.user.email;

            if (!email || !ALLOWED_USER_EMAILS.includes(email)) {
                alert("你沒有權限登入");
                return;
            }

            navigate("/dashboard");
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
