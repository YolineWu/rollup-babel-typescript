import { defineConfig } from "rollup";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";
import pkg from "./package.json" assert { type: "json" };

export default defineConfig({
  input: "./src/main.ts",
  external: [/@babel\/runtime/],
  output: {
    format: "es",
    dir: "dist",
    name: pkg.name,
    sourcemap: true,
    banner: `/* ${pkg.name} version ${pkg.version}*/`,
  },
  plugins: [
    resolve(),
    typescript({
      noForceEmit: true,
      tsconfig: "tsconfig.types.json",
    }),
    babel({
      babelHelpers: "runtime",
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    }),
  ],
});
