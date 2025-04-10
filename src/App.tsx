import { app } from "@/firebase/firebase";
import AppPage from "@/pages/AppPage";
import { getAuth, User } from "firebase/auth";
import { AnimatePresence, motion } from "framer-motion";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import SignInPage from "./pages/SignInPage";

export default function App() {
	const auth = getAuth(app);

	const [firebaseLoaded, setFirebaseLoaded] = useState(false);
	const [currentUser, setCurrentUser] = useState<User | null>(auth.currentUser);
	auth.onAuthStateChanged((user) => {
		setFirebaseLoaded(true);
		setCurrentUser(user);
	});

	return (
		<div className="w-full flex justify-center items-start p-2 min-h-screen overflow-hidden">
			<AnimatePresence mode="sync">
				{firebaseLoaded ? (
					<AnimatePresence mode="wait" initial={false}>
						{currentUser ? (
							<motion.div
								key="app-page"
								initial={{ opacity: 0, x: "1rem" }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: "1rem" }}
								transition={{ duration: 0.1 }}
								className="w-full"
							>
								<AppPage user={currentUser} />
							</motion.div>
						) : (
							<motion.div
								key="sign-in-page"
								initial={{ opacity: 0, x: "-1rem" }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: "-1rem" }}
								transition={{ duration: 0.1 }}
								className="w-full"
							>
								<SignInPage />
							</motion.div>
						)}
					</AnimatePresence>
				) : (
					<motion.div
						key="app-loader"
						animate={{ y: 0 }}
						exit={{ y: "calc(-100% - 3rem)" }}
						transition={{ duration: 0.2 }}
						className="fixed top-12 flex flex-col justify-center items-center gap-4 p-4 min-w-80 bg-background border border-border rounded-md z-10"
					>
						<img src="icon/icon-192.png" alt="App Logo" className="size-24" />
						<div className="flex gap-2 items-center">
							<div>
								<LoaderCircle strokeWidth={3} className="animate-spin text-muted-foreground" />
							</div>
							<p className="text-lg font-bold text-muted-foreground">Initialising Watcherr3</p>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
