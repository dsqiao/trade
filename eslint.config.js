import globals from "globals";
import pluginJs from "@eslint/js";
import pluginVue from "eslint-plugin-vue";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: [ "**/*.{js,mjs,cjs,vue}" ],
    rules: {
      'semi': [ "error", "always" ], // 强制行尾加分号
      'vue/max-attributes-per-line': [ 'error', {
        singleline: { max: 1 },
        multiline: { max: 1 }
      } ],
      'vue/html-indent': [ 'error', 2, { // 缩进空格数 
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: []
      } ],
      // 配置 HTML 关闭标签换行规则
      'vue/html-closing-bracket-newline': [ 'error', {
        singleline: 'never', // 单行元素关闭标签不换行
        multiline: 'always' // 多行元素关闭标签总是换行
      } ],
      'vue/html-quotes': [ 'error', 'double' ],
      'vue/no-spaces-around-equal-signs-in-attribute': [ 'error' ],
      'vue/html-closing-bracket-spacing': [ 'error', {
        startTag: 'never',
        endTag: 'never',
        selfClosingTag: 'always'
      } ],
      'vue/mustache-interpolation-spacing': [ 'error', 'always' ],
      'vue/attribute-hyphenation': [ 'error', 'always' ],
      'vue/v-bind-style': [ 'error', 'shorthand' ], // 强制使用简写 :prop 而不是 v-bind:prop
      // Vue 文件特定的规则
      'vue/key-spacing': [ 'error', { 'afterColon': true, 'beforeColon': false } ],
      'vue/object-curly-spacing': [ 'error', 'always' ],

      'keyword-spacing': [ 'error', { 
        before: true,  // 关键字前需要空格
        after: true    // 关键字后需要空格
      } ],
      'space-before-blocks': 'error', // 代码块前需要空格
      'space-infix-ops': 'error', // 操作符两侧需要空格
      'space-before-function-paren': [ 'error', {
        anonymous: 'always', // 匿名函数需要空格
        named: 'never',     // 命名函数不需要空格
        asyncArrow: 'always' // async箭头函数需要空格
      } ],
      'object-curly-spacing': [ 'error', 'always' ], // 大括号内需要空格
      'array-bracket-spacing': [ 'error', 'always' ], // 方括号内需要空格
      'computed-property-spacing': [ 'error', 'never' ], // 计算属性内不需要空格
      'func-call-spacing': [ 'error', 'never' ], // 函数调用时函数名和括号间不需要空格
      'indent': [ 'error', 2, {
        'SwitchCase': 1,       // switch case 的缩进级别
        'VariableDeclarator': { // 变量声明的缩进
          'var': 2,            // var 变量
          'let': 2,            // let 变量
          'const': 2           // const 变量
        },
        'outerIIFEBody': 1,    // 外层 IIFE 缩进
        'MemberExpression': 1,  // 成员表达式缩进
        'FunctionDeclaration': {
          'parameters': 1,     // 函数参数的缩进
          'body': 1            // 函数体的缩进
        },
        'FunctionExpression': {
          'parameters': 1,    // 函数表达式的参数缩进
          'body': 1           // 函数表达式的体缩进
        },
        'CallExpression': {
          'arguments': 1       // 调用表达式的参数缩进
        },
        'ArrayExpression': 1,  // 数组元素的缩进
        'ObjectExpression': 1, // 对象属性的缩进
        'ImportDeclaration': 1, // import 声明的缩进
        'flatTernaryExpressions': false, // 三元表达式是否扁平化
        'ignoredNodes': [],    // 忽略的 AST 节点
        'ignoreComments': false // 是否忽略注释
      } ],
      'comma-spacing': [ 'error', { 
        'before': false,  // 逗号前不允许空格
        'after': true    // 逗号后必须有一个空格
      } ],
      'key-spacing': [ 'error', {
        'beforeColon': false,  // 冒号前不允许空格
        'afterColon': true,   // 冒号后必须有一个空格
        'mode': 'strict'      // 严格模式（必须遵守上述规则）
      } ],
      'object-property-newline': [ 'error', { 'allowAllPropertiesOnSameLine': true } ],
      // 'object-curly-newline': [ 'error', {
      //   'ObjectExpression': { 
      //     'multiline': true,
      //     'minProperties': 10, // 3个以上属性时才考虑换行
      //     'consistent': true
      //   },
      //   'ObjectPattern': { 'minProperties': 10 },
      //   'ImportDeclaration': { 'minProperties': 10 },
      //   'ExportDeclaration': { 'minProperties': 10 }
      // } ],
    
      // 最大行长度限制
      'max-len': [ 'error', { 'code': 200, 'ignoreUrls': true } ]
    }
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...pluginVue.configs["flat/essential"],
];