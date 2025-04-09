import ContentForm from "@/components/ContentForm";
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
import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "@/components/ui/theme-provider";
import { firebaseSignOut } from "@/firebase/auth";
import useContentList from "@/hooks/useContentList";
import { User } from "firebase/auth";
import { LogOut, Moon, Plus, Sun } from "lucide-react";
import { useState } from "react";

export default function AppPage({ user }: { user: User }) {
	const { theme, setTheme } = useTheme();

	const { content } = useContentList();

	const [addingContent, setAddingContent] = useState<boolean>(false);
	const [editingContent, setEditingContent] = useState<string[]>([]);

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
				{addingContent ? (
					<ContentForm close={() => setAddingContent(false)} />
				) : (
					<Button variant="outline" className="w-full" onClick={() => setAddingContent(true)}>
						<Plus />
						<span>Add New</span>
					</Button>
				)}

				<Separator />

				<div className="w-full flex flex-col justify-center items-center gap-2">
					{content ? (
						content.length === 0 ? (
							<span className="text-sm text-muted-foreground">No items yet</span>
						) : (
							content.map((content, index) =>
								editingContent.includes(content.id) ? (
									<ContentForm
										key={index}
										content={content}
										close={() => {
											setEditingContent((prev) => prev.filter((contentId) => contentId !== content.id));
										}}
									/>
								) : (
									<ContentItem
										key={index}
										content={content}
										onEdit={() => {
											setEditingContent((prev) => [...prev, content.id]);
										}}
									/>
								)
							)
						)
					) : (
						[...Array(3)].map((_, index) => <Skeleton key={index} className="w-full h-[3.25rem]" />)
					)}
				</div>
			</div>
		</div>
	);
}
