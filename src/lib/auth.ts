import {
    signInWithPopup,
    signInWithRedirect,
    getRedirectResult,
    AuthError,
} from "firebase/auth";

import { auth, provider } from "./firebase";

// 檢測是否為 iOS 設備
const isIOS = (): boolean => {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
};

// 統一的 Google 登入函數
export const signInWithGoogle = async () => {
    try {
        // 對於所有設備都使用 popup 方式，這樣更穩定
        const result = await signInWithPopup(auth, provider);
        return result;
    } catch (error) {
        const authError = error as AuthError;

        // 如果 popup 被阻擋或在 iOS Safari 中遇到問題，嘗試使用 redirect
        if (
            authError.code === "auth/popup-blocked" ||
            authError.code === "auth/popup-closed-by-user" ||
            (isIOS() && authError.code === "auth/operation-not-allowed")
        ) {
            console.log("Popup 失敗，嘗試使用 redirect 方式");
            await signInWithRedirect(auth, provider);
            return null; // redirect 不會立即返回結果
        }

        throw error;
    }
};

// 處理 redirect 結果（頁面加載時調用）
export const handleRedirectResult = async () => {
    try {
        const result = await getRedirectResult(auth);
        return result;
    } catch (error) {
        console.error("處理 redirect 結果錯誤:", error);
        throw error;
    }
};
