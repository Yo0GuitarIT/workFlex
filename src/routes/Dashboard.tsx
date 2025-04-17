import { useNavigate } from "react-router";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

function Dashboard() {
    const navigate = useNavigate();

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
        </div>
    );
}

export default Dashboard;
