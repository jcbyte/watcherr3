import { app } from "@/firebase/firebase";
import ListPage from "@/pages/ListPage";
import { getAuth, User } from "firebase/auth";
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
		<div className="w-full flex justify-center items-center">
			{firebaseLoaded ? (
				currentUser ? (
					<ListPage />
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
