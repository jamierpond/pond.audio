import coreWebVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  ...coreWebVitals,
  {
    ignores: ["_unused/", "madea-blog-core/"],
  },
];

export default eslintConfig;
