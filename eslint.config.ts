import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import unusedImports from "eslint-plugin-unused-imports";
import prettierConfig from "eslint-config-prettier/flat";

export default tseslint.config(
    {
        ignores: ["node_modules/", "dist/", "public/", ".vscode/", ".env*", ".pnp.*", ".yarn/"],
    },

    ...tseslint.configs.recommended,

    {
        files: ["src/**/*.{ts,tsx}"],

        plugins: {
            react: reactPlugin,
            "react-hooks": reactHooksPlugin,
            "unused-imports": unusedImports,
        },

        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },

        settings: {
            react: {
                version: "detect",
            },
        },

        rules: {
            ...reactPlugin.configs.flat.recommended.rules,
            ...reactHooksPlugin.configs.recommended.rules,

            // React
            "react/react-in-jsx-scope": "off",
            "react/prop-types": "off",
            "react/jsx-curly-brace-presence": ["warn", { props: "never", children: "never" }],

            // TypeScript
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    vars: "all",
                    varsIgnorePattern: "^_",
                    args: "after-used",
                    argsIgnorePattern: "^_",
                },
            ],
            "@typescript-eslint/no-explicit-any": "warn",

            // Common
            "no-console": "warn",
            "no-debugger": "error",
            "prefer-const": "error",
            "unused-imports/no-unused-imports": "error",
        },
    },
    prettierConfig,
);
