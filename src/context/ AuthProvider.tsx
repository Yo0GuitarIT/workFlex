import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { ReactNode, useEffect, useState } from "react";

import { auth, db } from "../lib/firebase";

import authContext from "./AuthContext";

const AuthProvider = ({ children }: { children: ReactNode }) => {
    // 使用者資訊
    const [user, setUser] = useState<User | null>(null);
    // 角色權限
    const [role, setRole] = useState<"editor" | "viewer" | null>(null);
    // 是否正在載入
    const [loading, setLoading] = useState(true);

    // 獲取使用者角色的函數
    const fetchUserRole = async (uid: string): Promise<"editor" | "viewer" | null> => {
        try {
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                console.log("Document does not exist for user:", uid);
                return null;
            }

            const userData = docSnap.data();
            console.log("Document data:", userData);
            return userData?.role as "editor" | "viewer" || null;
        } catch (error) {
            console.error("Error fetching user role:", error);
            return null;
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setUser(firebaseUser);

            // 如果使用者未登入，直接設置角色為 null
            if (!firebaseUser) {
                setRole(null);
                setLoading(false);
                return;
            }

            // 使用者已登入，從 Firestore 獲取角色
            const userRole = await fetchUserRole(firebaseUser.uid);
            setRole(userRole);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <authContext.Provider value={{ user, role, loading }}>
            {children}
        </authContext.Provider>
    );
};

export default AuthProvider;
