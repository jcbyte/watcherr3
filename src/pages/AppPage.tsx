import ContentItem from "@/components/ContentItem";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/components/ui/theme-provider";
import { firebaseSignOut } from "@/firebase/auth";
import { Content } from "@/types";
import { WithId } from "@/util/types";
import { User } from "firebase/auth";
import { LogOut, Moon, Plus, Sun } from "lucide-react";
import { useState } from "react";

export default function AppPage({ user }: { user: User }) {
	const { theme, setTheme } = useTheme();

	const [content, setContent] = useState<WithId<Content>[]>([
		{ id: "1", title: "Film 1", type: "Film" },
		{ id: "2", title: "Film 2", type: "Film" },
		{ id: "3", title: "Series 1", type: "Series", season: 1, episode: 1 },
		{ id: "4", title: "Series 2", type: "Series", season: 1, episode: 1 },
	]);

	return (
		<div className="flex flex-col justify-center items-center gap-4 w-full max-w-96">
			<div className="flex justify-between items-center w-full">
				<span className="text-2xl font-semibold">Watcherr3</span>

				<div className="flex justify-center items-center gap-2">
					<Button variant="outline" className="size-8" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
						{theme === "dark" ? <Sun /> : <Moon />}
					</Button>

					<DropdownMenu>
						<DropdownMenuTrigger>
							<Avatar>
								<AvatarImage src={user.photoURL ?? undefined} />
								<AvatarFallback>{user.displayName?.slice(0, 2)}</AvatarFallback>
							</Avatar>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem onClick={firebaseSignOut}>
								<div className="flex justify-between items-center w-full">
									<span className="text-destructive">Sign Out</span>
									<LogOut className="text-destructive size-4" />
								</div>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>

			<div className="w-full flex flex-col justify-center items-center gap-2">
				<Button variant="outline" className="w-full" onClick={() => {}}>
					<Plus />
					<span>Add New</span>
				</Button>
				<Separator />

				<div className="w-full flex flex-col justify-center items-center gap-2">
					{content.map((content, index) => (
						<ContentItem key={index} content={content} />
					))}
				</div>
			</div>
		</div>
	);
}
