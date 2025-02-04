import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import globals from "globals";

export default [
  {
    ignores: ["dist/**/*", "**/*.js", "**/*.cjs", "**/*.mjs"],
  },
  {
    files: ["**/*.{ts,tsx}"],
  },
  {
    plugins: {
      "@typescript-eslint": typescriptEslint,
      react,
    },
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
      },
    },

    rules: {
      "@typescript-eslint/no-unused-vars": [
        1,
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },
];
