import useAuth from "../hook/useAuth";
import useUserRole from "../hook/useUserRole";

const Records = () => {
    const { user } = useAuth();
    const { data: role, isLoading } = useUserRole(user?.uid);

    if (!user) return <div>尚未登入</div>;
    if (isLoading) return <div>讀取角色中...</div>;

    const isEditor = typeof role === "string" && role === "editor";

    return (
        <div>
            <h1>紀錄頁</h1>
            {isEditor && <p>你是編輯者，可以新增 / 刪除紀錄</p>}
            {!isEditor && <p>你是瀏覽者，只能看紀錄</p>}
        </div>
    );
};

export default Records;
