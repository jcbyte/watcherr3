import { app } from "@/firebase/firebase";
import AppPage from "@/pages/AppPage";
import { getAuth, User } from "firebase/auth";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import SignInPage from "./pages/SignInPage";

// todo pwa
// todo icon
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
			{firebaseLoaded ? (
				currentUser ? (
					<AppPage user={currentUser} />
				) : (
					<SignInPage />
				)
			) : (
				<div className="fixed top-12 flex flex-col justify-center items-center gap-4 w-full p-4">
					<img src="vite.svg" alt="App Logo" className="size-24" />
					<div className="flex gap-2 items-center">
						<LoaderCircle strokeWidth={3} className="animate-spin text-muted-foreground" />
						<p className="text-lg font-bold text-muted-foreground">Initialising Watcherr3</p>
					</div>
				</div>
			)}
		</div>
	);
}
