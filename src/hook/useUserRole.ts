import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";

import { db } from "../lib/firebase";

type UserRoleDoc = {
    email: string;
    role: "editor" | "viewer";
};

const useUserRole = (uid: string | undefined) => {
    return useQuery<UserRoleDoc | null>({
        queryKey: ["userRole", uid],
        enabled: !!uid,
        queryFn: async () => {
            const snap = await getDoc(doc(db, "users", uid!));
            return snap.exists() ? (snap.data() as UserRoleDoc) : null;
        },
    });
};

export default useUserRole;
