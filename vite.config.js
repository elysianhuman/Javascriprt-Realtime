import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import prettier from "vite-plugin-prettier";

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react(), prettier()],
//   base: "/Javascriprt-Realtime/"
// });

export default defineConfig({
  plugins: [react(), prettier()],
  base: "./"
});