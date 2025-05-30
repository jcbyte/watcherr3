import { ThemeProvider } from "@/components/ui/theme-provider.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ThemeProvider defaultTheme="dark">
			<App />
		</ThemeProvider>
	</StrictMode>
);
