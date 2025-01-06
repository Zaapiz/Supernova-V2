import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import vueTsEslintConfig from "@vue/eslint-config-typescript";
import pluginAstro from "eslint-plugin-astro";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["src/**/*.{js,ts,vue,astro}"] },
  { files: ["index.ts", "server/**/*.{js,ts}"] },
  { ignores: ["**/*", "!src/**", "!index.ts", "!server/**"] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  {
    rules: {
      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-ignore": false,
        },
      ],
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  ...vueTsEslintConfig(),
  pluginAstro.configs.recommended,
];
