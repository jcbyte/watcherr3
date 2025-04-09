import GoogleGLogo from "@/assets/GoogleGLogo.svg";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { signInWithGoogle } from "@/firebase/auth";

export default function SignInPage() {
	return (
		<>
			<div className="flex flex-col items-center justify-center gap-4 bg-card p-8 rounded-md min-w-96">
				<div className="flex flex-col items-center justify-center">
					<span className="text-2xl font-bold text-center">Welcome to Watcherr3</span>
					<span className="text-muted-foreground text-center">Sign in to start your watchlist</span>
				</div>
				<Separator />
				<Button onClick={signInWithGoogle} className="w-full">
					<img src={GoogleGLogo} className="size-5" />
					<span className="font-semibold">Continue with Google</span>
				</Button>
				<span className="text-sm text-muted-foreground text-center">Watcherr3 v3.0.0 by Joel Cutler</span>
			</div>
		</>
	);
}
