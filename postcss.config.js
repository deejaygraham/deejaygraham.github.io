import postcssImport from "postcss-import";
import postcssImportExtGlob from "postcss-import-ext-glob";
import cssnano from "cssnano";
/** @type {import('postcss-load-config').Config} */
export default {
  plugins: [
    postcssImportExtGlob(),
    postcssImport(),
    cssnano({
      preset: "default",
    }),
  ],
};
