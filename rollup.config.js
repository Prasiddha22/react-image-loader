import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import autoprefixer from 'autoprefixer';
import postcss from 'rollup-plugin-postcss';

export default [
  // CommonJS
  {
    preserveModules: true,
    input: './src/index.tsx',
    output: [
      {
        dir: './dist',
        format: 'cjs',
      },
    ],
    plugins: [
      babel({
        exclude: 'node_modules/**',
      }),
      typescript({
        typescript: require('typescript'),
      }),
      postcss({
        plugins: [autoprefixer()],
        sourceMap: true,
        extract: true,
        minimize: true,
      }),
      terser(), // minifies generated bundles
    ],
  },
];
