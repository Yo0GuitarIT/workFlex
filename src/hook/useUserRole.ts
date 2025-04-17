import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

const useUserRole = (uid: string | undefined) => {
    return useQuery({
        queryKey: ["userRole", uid],
        enabled: !!uid,
        queryFn: async () => {
            const snap = await getDoc(doc(db, "users", uid!));
            return snap.exists() ? snap.data() : null;
        },
    });
};

export default useUserRole;
