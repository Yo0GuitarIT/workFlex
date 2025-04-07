import { useNavigate } from "react-router";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

function Dashboard() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/");
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">這是 Dashboard 頁面</h1>
            <button
                onClick={handleLogout}
                className="mt-4 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
                登出
            </button>
        </div>
    );
}

export default Dashboard;
