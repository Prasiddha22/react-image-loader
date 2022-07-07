const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer')
const typescript = require('rollup-plugin-typescript2');
const babel = require('rollup-plugin-babel');


module.exports = {
    rollup(config, options) {
        config.preserveModules = true,
            config.input = './src/index.tsx',
            config.output = [
                {
                    dir: './dist',
                    format: 'cjs',
                },
            ],
            config.plugins.push(
                typescript({
                    typescript: require('typescript'),
                }),
                babel({
                    exclude: 'node_modules/**',
                }),
                postcss({
                    plugins: [autoprefixer()],
                    sourceMap: true,
                    extract: true,
                    minimize: true,
                })
            );
        return config;
    },
};