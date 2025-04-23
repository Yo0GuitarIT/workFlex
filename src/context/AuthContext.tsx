import { createContext, ReactNode, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

type AuthContextType = {
    user: User | null;
    role: "editor" | "viewer" | null;
    loading: boolean;
};

export const authContext = createContext<AuthContextType>({
    user: null,
    role: null,
    loading: true,
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
    // 使用者資訊
    const [user, setUser] = useState<User | null>(null);
    // 角色權限
    const [role, setRole] = useState<"editor" | "viewer" | null>(null);
    // 是否正在載入
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setUser(firebaseUser);

            // 如果使用者已登入，則從 Firestore 獲取角色
            // 如果使用者未登入，則設置角色為 null
            if (firebaseUser) {
                const docRef = doc(db, "users", firebaseUser.uid);
                const docSnap = await getDoc(docRef);
                if (!docSnap.exists()) {
                    setRole(null);
                }
                setRole(docSnap.data()?.role as "editor" | "viewer");
            }else{
                setRole(null);
            }

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
