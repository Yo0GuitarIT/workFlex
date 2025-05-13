import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

import { db } from "../lib/firebase";

import useAuth from "./useAuth";

export type RecordItem = {
    id: string;
    type: "overtime" | "compensate";
    date: string;
    hours: number;
    reason: string;
    createdAt?: { seconds: number };
};

/**
 * @description 使用 useQuery 來獲取 Firestore 中的紀錄資料
 */
const useRecordsQuery = () => {
    const { user } = useAuth();

    return useQuery<RecordItem[]>({
        queryKey: ["records", user?.uid],
        enabled: !!user?.uid,
        queryFn: async () => { // TODO: 全局例外處理
            try {
                const ref = collection(db, "records");
                const q = query(
                    ref,
                    where("uid", "==", user!.uid),
                    orderBy("createdAt", "desc"),
                );
                const snapshot = await getDocs(q);
                return snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...(doc.data() as Omit<RecordItem, "id">),
                }));
            } catch (err) {
                console.error("Firestore 撈資料失敗：", err);
                throw err;
            }
        },
    });
};

export default useRecordsQuery;
