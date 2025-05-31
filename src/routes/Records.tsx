import RecordForm from "../components/RecordForm";
import RecordList from "../components/RecordList";
import useAuth from "../hooks/useAuth";

const Records = () => {
    const { role } = useAuth();

    const isEditor = role === "editor";

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">紀錄頁</h1>
            <RecordList />
            {isEditor && <RecordForm />}
        </div>
    );
};

export default Records;
