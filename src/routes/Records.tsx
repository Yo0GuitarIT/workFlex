import RecordForm from "../components/RecordForm";
import RecordList from "../components/RecordList";
import useAuth from "../hooks/useAuth";

const Records = () => {
    const { role } = useAuth();

    const isEditor = role === "editor";

   

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">紀錄頁</h1>

            {isEditor && <p>你是編輯者，可以新增 / 刪除紀錄</p>}
            {!isEditor && <p>你是瀏覽者，只能看紀錄</p>}
            <RecordList />
            <RecordForm />
        </div>
    );
};

export default Records;
