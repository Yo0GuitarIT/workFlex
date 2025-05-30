import OvertimeSummary from "../components/OvertimeSummary";
import useAuth from "../hooks/useAuth";

function Dashboard() {
    const { role } = useAuth();

    const isEditor = role === "editor";

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">這是 Dashboard 頁面</h1>

            {isEditor && <p>你是編輯者，可以在 record 頁面紀錄</p>}
            {!isEditor && <p>你是瀏覽者，只能看紀錄</p>}

            <div className="mt-8">
                <OvertimeSummary />
            </div>
        </div>
    );
}

export default Dashboard;
