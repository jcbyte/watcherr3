import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";
import { ManifestOptions, VitePWA } from "vite-plugin-pwa";

const manifest: Partial<ManifestOptions> = {
	name: "Watcherr3",
	short_name: "Watcherr3",
	description:
		"Web app to serve as your watchlist for current shows and films, helping you keep track of what you still want to watch and your progress.",
	start_url: "/",
	display: "standalone",
	background_color: "#09090b",
	theme_color: "#09090b",
	icons: [
		{ src: "/favicon.ico", type: "image/x-icon", sizes: "16x16 32x32" },
		{ src: "/icon/icon-192.png", type: "image/png", sizes: "192x192" },
		{ src: "/icon/icon-512.png", type: "image/png", sizes: "512x512" },
		{ src: "/icon/icon-192-maskable.png", type: "image/png", sizes: "192x192", purpose: "maskable" },
		{ src: "/icon/icon-512-maskable.png", type: "image/png", sizes: "512x512", purpose: "maskable" },
	],
	lang: "en",
	scope: "/",
	orientation: "portrait",
};

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss(), VitePWA({ registerType: "autoUpdate", manifest })],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
