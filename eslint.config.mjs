import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "tsconfig.json",
        sourceType: "module",
      },
    },
  },
  ...compat.extends(
      "prettier",
      "next",
      "next/typescript",
      "next/core-web-vitals",
  ),
];

export default eslintConfig;
