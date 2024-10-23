const typescript = require("rollup-plugin-typescript2");
const pkg = require("./package.json");
const terser = require("@rollup/plugin-terser");
const json = require("@rollup/plugin-json");
const peerDepsExternal = require("rollup-plugin-peer-deps-external");
const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
module.exports = {
    input: "src/index.ts",
    output: [
        {
            file: pkg.main,
            format: "cjs",
            sourcemap: true
        },
        {
            file: pkg.module,
            format: "esm",
            sourcemap: true
        }
    ],
    external: ['react','react-native'],
    plugins: [
        peerDepsExternal(),
        resolve(),
        commonjs(),
        typescript({
            tsconfig: './tsconfig.json'
          }),
        json(),
        terser()
    ]
};
