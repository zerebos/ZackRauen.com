import {node} from "@zerebos/eslint-config";
import ts from "@zerebos/eslint-config-typescript";

/** @type {import("@zerebos/eslint-config-typescript").ConfigArray} */
export default [
    {
        ignores: [
            ".astro/**",
            "dist/**",
            "public/**",
            "node_modules/**",
            "**/*.d.ts",
            "eslint.config.js",
            "package-lock.json"
        ]
    },
    ...node,
    ...ts.configs.recommended,
    // {
    //     rules: {
    //         "no-console": "off",
    //         "@typescript-eslint/no-misused-promises": ["error", {checksVoidReturn: {arguments: false, returns: false}}],
    //     }
    // }
];