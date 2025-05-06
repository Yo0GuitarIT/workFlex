import { useNavigate } from "react-router";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import useAuth from "../hook/useAuth";

function Dashboard() {
    const { role } = useAuth();
    const navigate = useNavigate();

    const isEditor = role === "editor";

    const handleRecord = () => {
        navigate("/record");
    };

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/");
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">這是 Dashboard 頁面</h1>
            <button
                className="mt-4 mr-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                onClick={handleRecord}
            >
                record
            </button>
            <button
                className="mt-4 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                onClick={handleLogout}
            >
                登出
            </button>

            {isEditor && <p>你是編輯者，可以在 record 頁面紀錄</p>}
            {!isEditor && <p>你是瀏覽者，只能看紀錄</p>}
        </div>
    );
}

export default Dashboard;
