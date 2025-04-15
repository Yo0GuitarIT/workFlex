import { createContext, ReactNode, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";

type AuthContextType = {
    user: User | null;
    loading: boolean;
};

export const authContext = createContext<AuthContextType>({
    user: null,
    loading: true,
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <authContext.Provider value={{ user, loading }}>
            {children}
        </authContext.Provider>
    );
};

export default AuthProvider;
