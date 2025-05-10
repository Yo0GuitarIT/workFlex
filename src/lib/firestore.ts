import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { db } from "./firebase";

interface RecordType {
    uid: string; // 使用者 ID
    type: "overtime" | "compensate"; // 紀錄類型：加班或補休
    date: string; // 日期
    hours: number; // 時數
    reason: string; // 事由
}

// 新增紀錄到 Firestore 的函式
const addRecord = async (record: RecordType) => {
    // 使用 addDoc 將紀錄新增到 "records" 集合中
    await addDoc(collection(db, "records"), {
        ...record, // 展開紀錄物件的屬性
        createdAt: serverTimestamp(), // 新增建立時間戳記
    });
};

export { addRecord };
