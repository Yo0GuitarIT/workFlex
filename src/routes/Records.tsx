import { signOut } from "firebase/auth";
import { useNavigate } from "react-router";

import RecordForm from "../components/RecordForm";
import useAuth from "../hook/useAuth";
import { auth } from "../lib/firebase";

const Records = () => {
    const { role } = useAuth();
    const navigate = useNavigate();

    const isEditor = role === "editor";

    const handleDashboard = () => {
        navigate("/");
    };

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/login");
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">紀錄頁</h1>
            <button
                className="mt-4 mr-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                onClick={handleDashboard}
            >
                dashboard
            </button>
            <button
                className="mt-4 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                onClick={handleLogout}
            >
                登出
            </button>

            {isEditor && <p>你是編輯者，可以新增 / 刪除紀錄</p>}
            {!isEditor && <p>你是瀏覽者，只能看紀錄</p>}

            <RecordForm/>
        </div>
    );
};

export default Records;
