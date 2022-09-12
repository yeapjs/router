import babel from "@rollup/plugin-babel"
import extensions from "rollup-plugin-extensions"

export default {
  input: "src/app.ts",
  plugins: [
    // used for fix `[!] Error: Could not resolve './Link' from src/app.ts`
    extensions({
      extensions: [".tsx", ".ts"],
      resolveIndex: true,
    }),
    babel({
      exclude: /node_modules/,
      babelHelpers: "bundled",
      presets: [
        ["@babel/preset-env", { loose: false }],
        ["@babel/preset-react", { pragma: "h" }],
        "@babel/preset-typescript",
      ],
      extensions: [".ts", ".tsx"],
    }),
  ],
  output: [
    {
      file: "lib/app.js",
      format: "esm",
    },
  ],
}
