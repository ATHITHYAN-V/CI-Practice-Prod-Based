module.exports = {
  root: true,

  extends: ["erb"],

  parser: "@typescript-eslint/parser",

  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },

  plugins: ["@typescript-eslint", "compat"],

  rules: {
    // Electron / React modern setup
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": "off",

    // Build tools & TS resolution
    "import/no-extraneous-dependencies": "off",
    "import/extensions": "off",
    "import/no-unresolved": "off",
    "import/no-import-module-exports": "off",

    // TypeScript rules
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": "error",

    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",

    // Electron compat rule (BREAKS with new Electron)
    "compat/compat": "off",
  },

  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        moduleDirectory: ["node_modules", "src/"],
      },
      webpack: {
        config: require.resolve("./.erb/configs/webpack.config.eslint.ts"),
      },
      typescript: {},
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
  },

  overrides: [
    {
      files: [".erb/**/*", "webpack*.ts"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
  ],
};
