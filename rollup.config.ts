import { defineConfig } from "rollup";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";
import pkg from "./package.json" assert { type: "json" };
import replace from "@rollup/plugin-replace";

/** 定义需要被替换的字符串及对应替换的内容 */
const replaceMap: Record<string, string> = Object.keys(process.env).reduce(
  (result: Record<string, string>, key: string) => {
    result[`process.env.${key}`] = `"${process.env[key]}"`;
    return result;
  },
  {},
);

/** 定义 rollup 配置 */
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
    replace({ values: replaceMap, preventAssignment: true }),
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
