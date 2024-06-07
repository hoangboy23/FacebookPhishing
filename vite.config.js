import react from "@vitejs/plugin-react";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
// import obfuscatorPlugin from "vite-plugin-javascript-obfuscator";
// , obfuscatorPlugin()
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
	plugins: [react()],
	build: {
		outDir: resolve(__dirname, "../static"),
		emptyOutDir: true,
		rollupOptions: {
			output: {
				manualChunks: {
					vendor: ["react", "react-dom"],
				},
			},
		},
	},
	server: {
		host: "0.0.0.0",
		port: 3000,
	},
});
