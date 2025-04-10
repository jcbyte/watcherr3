import { app } from "@/firebase/firebase";
import AppPage from "@/pages/AppPage";
import { getAuth, User } from "firebase/auth";
import { AnimatePresence, motion } from "framer-motion";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import SignInPage from "./pages/SignInPage";

// todo animate

export default function App() {
	const auth = getAuth(app);

	const [firebaseLoaded, setFirebaseLoaded] = useState(false);
	const [currentUser, setCurrentUser] = useState<User | null>(auth.currentUser);
	auth.onAuthStateChanged((user) => {
		setFirebaseLoaded(true);
		setCurrentUser(user);
	});

	return (
		<div className="w-full flex justify-center items-center p-2">
			<AnimatePresence mode="sync">
				{firebaseLoaded ? (
					currentUser ? (
						<AppPage user={currentUser} />
					) : (
						<SignInPage />
					)
				) : (
					<motion.div
						key="app-loader"
						animate={{ y: 0 }}
						exit={{ y: "calc(-100% - 3rem)" }}
						transition={{ duration: 0.2, ease: "easeIn" }}
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
