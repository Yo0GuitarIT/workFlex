import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    build: {
        // 增加塊大小警告閾值，減少不必要的警告
        chunkSizeWarningLimit: 800,
        rollupOptions: {
            output: {
                manualChunks: (id) => {
                    // React 相關庫
                    if (
                        id.includes("node_modules/react/") ||
                        id.includes("node_modules/react-dom/") ||
                        id.includes("node_modules/react-router/")
                    ) {
                        return "react-vendor";
                    }

                    // Firebase 相關庫
                    if (id.includes("node_modules/firebase/")) {
                        return "firebase-vendor";
                    }

                    // Mantine UI 相關庫
                    if (
                        id.includes("node_modules/@mantine/") ||
                        id.includes("node_modules/@phosphor-icons/")
                    ) {
                        return "ui-vendor";
                    }

                    // 其他工具庫
                    if (
                        id.includes("node_modules/@tanstack/") ||
                        id.includes("node_modules/react-hook-form/") ||
                        id.includes("node_modules/zod/") ||
                        id.includes("node_modules/dayjs/")
                    ) {
                        return "utils-vendor";
                    }
                },
            },
        },
    },
});
