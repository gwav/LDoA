import { terser } from 'rollup-plugin-terser';

export default {
  input: 'lastdays.js',
  output: {
    file: 'lastdays.min.js',
    format: 'esm',
    plugins: [terser()]
  }
};
