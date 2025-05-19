import js from "@eslint/js";
import globals from "globals";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import"; 

export default tseslint.config(
    { ignores: ["dist"] },
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            react: reactPlugin,
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
            import: importPlugin,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            "react-refresh/only-export-components": [
                "warn",
                { allowConstantExport: true },
            ],
            "import/order": [
                // 新增這些規則
                "warn",
                {
                    groups: [
                        "builtin",
                        "external",
                        "internal",
                        "parent",
                        "sibling",
                        "index",
                        "object",
                        "type",
                    ],
                    "newlines-between": "always",
                    alphabetize: { order: "asc", caseInsensitive: true },
                },
            ],
            "import/newline-after-import": "warn",
            // React props 排序規則
            "react/jsx-sort-props": [
                "warn",
                {
                    callbacksLast: true, // 回調函數放在最後
                    shorthandFirst: true, // 短語法屬性放在前面 (例如: disabled 而非 disabled={true})
                    multiline: "last", // 多行屬性放在最後
                    ignoreCase: true, // 忽略大小寫
                    reservedFirst: ["key", "ref"], // 保留字段放在最前面
                }
            ],
        },
    },
);
