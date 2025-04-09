import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import "./firebase";

export async function signInWithGoogle(): Promise<void> {
	const provider = new GoogleAuthProvider();
	await signInWithPopup(getAuth(), provider);
}

export async function firebaseSignOut(): Promise<void> {
	await signOut(getAuth());
}
