// import typescript from "@rollup/plugin-typescript";
// creates d.ts files for everthing
import typescript from 'rollup-plugin-typescript2';
import external from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
// we probably want full sources
import { terser } from 'rollup-plugin-terser';
// import postcss from "rollup-plugin-postcss";
// can create nice css.d.ts files
import postcss from 'rollup-plugin-postcss-modules';
import del from "rollup-plugin-delete";
import pkg from "./package.json";

export default {
  // preserveModules: true,
  input: pkg.source,
  output: [
    { file: pkg.main, format: "cjs", sourcemap: true },
    { file: pkg.module, format: "esm", sourcemap: true },
  ],
  plugins: [
    postcss({
      writeDefinitions: true,
      modules: true,
      sourceMap: true,
      extract: true,
      minimize: true,
    }),
    external(),
    resolve(),
    commonjs(),
    typescript(),
    del({ targets: ["dist/*"] }),
    // terser()
  ],
  external: Object.keys(pkg.peerDependencies || {}),
};
