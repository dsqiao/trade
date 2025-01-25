import globals from "globals";
import pluginJs from "@eslint/js";
import pluginVue from "eslint-plugin-vue";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,vue}"],
    rules: {
      semi: ["error", "always"], // 强制行尾加分号
      'vue/max-attributes-per-line': ['error', {
        singleline: { max: 1 },
        multiline: { max: 1 }
      }],
      'vue/html-indent': ['error', 2, { // 缩进空格数 
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: []
      }],
      // 配置 HTML 关闭标签换行规则
      'vue/html-closing-bracket-newline': ['error', {
        singleline: 'never', // 单行元素关闭标签不换行
        multiline: 'always' // 多行元素关闭标签总是换行
      }],
    }
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...pluginVue.configs["flat/essential"],
];