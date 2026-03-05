import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      // Complexity
      complexity: ["error", { max: 3 }],
      "max-depth": ["error", { max: 2 }],
      "max-nested-callbacks": ["error", { max: 2 }],
      "max-lines-per-function": ["error", { max: 20, skipBlankLines: true, skipComments: true }],
      "max-params": ["error", { max: 3 }],

      // Pure functions / no mutation
      "no-param-reassign": "error",
      "prefer-const": "error",
      "no-var": "error",
      "no-let": "off",

      // Strict
      eqeqeq: ["error", "always"],
      "no-implicit-coercion": "error",
      "no-shadow": "error",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/no-explicit-any": "error",

      // Style
      "no-console": "off",
      "no-magic-numbers": "off",
      "@typescript-eslint/no-magic-numbers": ["error", {
        ignore: [],
        ignoreArrayIndexes: true,
        ignoreNumericLiteralTypes: true,
        ignoreEnums: true,
        ignoreReadonlyClassProperties: true,
        enforceConst: true,
        detectObjects: false,
      }],
    },
  },
];
