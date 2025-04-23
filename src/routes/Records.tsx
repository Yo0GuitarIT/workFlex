import useAuth from "../hook/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useNavigate } from "react-router";

const Records = () => {
    const { user , role, loading} = useAuth();
    const navigate = useNavigate();

    if (loading) return <div>讀取角色中...</div>;
    if (!user) return <div>尚未登入</div>;

    const isEditor = role === "editor";

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/");
    };

    return (
        <div>
            <h1>紀錄頁</h1>
            <button
                className="mt-4 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                onClick={handleLogout}
            >
                登出
            </button>
            {isEditor && <p>你是編輯者，可以新增 / 刪除紀錄</p>}
            {!isEditor && <p>你是瀏覽者，只能看紀錄</p>}
        </div>
    );
};

export default Records;
