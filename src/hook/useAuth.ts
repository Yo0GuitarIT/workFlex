import { useContext } from "react";
import { authContext } from "../context/AuthContext.tsx";

const useAuth =()=> useContext(authContext)

export default useAuth;