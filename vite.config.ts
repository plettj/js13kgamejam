import { defineConfig } from "vite";
import kontra from "rollup-plugin-kontra";
export default defineConfig({
  resolve: {
    alias: {},
  },
  build: {
    minify: "terser",
    rollupOptions: {
      plugins: [
        kontra({
          debug: false,
        }),
      ],
    },
    terserOptions: {
      toplevel: true,
      compress: {
        defaults: true,
        drop_console: true,
        reduce_vars: true,
        unsafe: true,
        keep_fargs: false,
        passes: 3,
      },
      mangle: {
        keep_fnames: false,
        keep_classnames: false,
        eval: true,
        module: true,
        toplevel: true,
        safari10: true,
        properties: true,
      },
      output: {
        quote_keys: false,
        comments: false,
        ecma: 2020,
      },
    },
  },
});
