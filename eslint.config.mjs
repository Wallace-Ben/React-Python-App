import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import pluginImport from "eslint-plugin-import";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      js,
      react: pluginReact,
      import: pluginImport,
    },
    rules: {
      // Enable rules from eslint-plugin-import to detect missing imports
      "import/no-unresolved": "error",
      "import/named": "error",
      "import/default": "error",
      "import/no-named-as-default": "warn",
    },
    extends: ["js/recommended"],
  },
  // React recommended config (flattened)
  pluginReact.configs.flat.recommended,
]);
