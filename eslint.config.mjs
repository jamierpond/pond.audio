import coreWebVitals from "eslint-config-next/core-web-vitals";
import * as espree from "espree";

const eslintConfig = [
  ...coreWebVitals,
  {
    // eslint-plugin-react 7.x's React version auto-detect calls
    // context.getFilename(), which ESLint 10 removed. Pin it explicitly.
    settings: { react: { version: "19.3" } },
  },
  {
    // Next's bundled Babel parser returns a scope manager without
    // addGlobals(), which ESLint 10 requires. Parse plain JS with espree.
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: { parser: espree },
  },
  {
    ignores: ["_unused/", "madea-blog-core/"],
  },
];

export default eslintConfig;
