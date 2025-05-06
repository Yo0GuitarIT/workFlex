import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { db } from "./firebase";

interface RecordType {
    uid: string;
    type: "overtime" | "compensate";
    date: string;
    hours: number;
    reason: string;
}

// Function to add a record to Firestore
const addRecord = async (record: RecordType) => {
    await addDoc(collection(db, "records"), {
        ...record,
        createdAt: serverTimestamp(),
    });
};

export { addRecord };
