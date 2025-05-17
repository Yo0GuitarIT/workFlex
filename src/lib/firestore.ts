import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    serverTimestamp,
    updateDoc,
} from "firebase/firestore";

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

// 刪除 Firestore 中的紀錄
const deleteRecord = async (recordId: string) => {
    await deleteDoc(doc(db, "records", recordId));
};

// 更新 Firestore 中的紀錄
const updateRecord = async (recordId: string, data: Partial<RecordType>) => {
    await updateDoc(doc(db, "records", recordId), data);
};

export { addRecord, deleteRecord, updateRecord };
