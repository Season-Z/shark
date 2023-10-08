import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import monacoEditorPlugin from "vite-plugin-monaco-editor";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), monacoEditorPlugin({})],
  define: {
    "process.env": {},
    "process.env.NODE_ENV": `"${process.env.NODE_ENV}"`,
  },
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
});
