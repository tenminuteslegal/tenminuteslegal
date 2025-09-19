// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   build: {
//     outDir: "dist",
//     rollupOptions: {
//       input: {
//         main: "./index.html",
//       },
//     },
//     copyPublicDir: true,
//   },
// });

import { resolve } from "path";
import { defineConfig } from "vite";
// import reactRefresh from "@vitejs/plugin-react-refresh";

const root = resolve(__dirname, "src");
const outDir = resolve(__dirname, "dist");

// https://vitejs.dev/config/
export default defineConfig({
  root,
  plugins: [reactRefresh()],
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, "index.html"),
        about: resolve(root, "about", "index.html"),
      },
    },
  },
});