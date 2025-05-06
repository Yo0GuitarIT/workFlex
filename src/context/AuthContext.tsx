import { createContext } from "react";
import { User } from "firebase/auth";


export type AuthContextType = {
    user: User | null;
    role: "editor" | "viewer" | null;
    loading: boolean;
};

const authContext = createContext<AuthContextType>({
    user: null,
    role: null,
    loading: true,
});


export default authContext;