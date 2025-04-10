import { Button } from "@/components/ui/button";
import { deleteContent, editContent } from "@/firebase/firestore";
import { Content } from "@/types";
import { WithId } from "@/util/types";
import { ChevronRight, Dot, Edit, ExternalLink, LoaderCircle, Trash2 } from "lucide-react";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

export default function ContentItem({ content, onEdit }: { content: WithId<Content>; onEdit: () => void }) {
	const [updatingContent, setUpdatingContent] = useState<boolean>(false);

	return (
		<div className="w-full bg-card rounded-md p-2 flex justify-between items-center">
			<div className="flex flex-col">
				{content.link ? (
					<div
						className="flex items-center gap-2 hover:underline cursor-pointer"
						onClick={() => window.open(content.link, "_blank")}
					>
						<span className="text-sm font-semibold">{content.title}</span>
						<ExternalLink className="size-4 text-muted-foreground" />
					</div>
				) : (
					<span className="text-sm font-semibold">{content.title}</span>
				)}
				<div className="flex items-center gap-1">
					{content.type === "series" ? (
						<div className="flex justify-center items-center gap-1">
							<div className="flex justify-center items-center">
								<span className="text-muted-foreground text-sm">Season {content.season}</span>
								<div
									className="p-0.5 bg-card hover:bg-muted duration-200 rounded-full"
									onClick={async () => {
										if (updatingContent) return;

										setUpdatingContent(true);
										await editContent({ ...content, season: content.season + 1, episode: 1 });
										setUpdatingContent(false);
									}}
								>
									{updatingContent ? (
										<div className="size-[1.2rem]">
											<LoaderCircle className="size-[1rem] animate-spin" />
										</div>
									) : (
										<ChevronRight className="size-[1.2rem]" />
									)}
								</div>
							</div>
							<Dot className="text-muted-foreground -ml-2 size-4" />
							<div className="flex justify-center items-center gap-1">
								<span className="text-muted-foreground text-sm">Episode {content.episode}</span>
								<div
									className="p-0.5 bg-card hover:bg-muted duration-200 rounded-full"
									onClick={async () => {
										if (updatingContent) return;

										setUpdatingContent(true);
										await editContent({ ...content, episode: content.episode + 1 });
										setUpdatingContent(false);
									}}
								>
									{updatingContent ? (
										<div className="size-[1.2rem]">
											<LoaderCircle className="size-[1rem] animate-spin" />
										</div>
									) : (
										<ChevronRight className="size-[1.2rem]" />
									)}
								</div>
							</div>
						</div>
					) : (
						<span className="text-muted-foreground text-sm">Film</span>
					)}
					{content.time && <span className="text-sm font-semibold">{content.time}m</span>}
				</div>
			</div>

			<div className="flex gap-1">
				<Button variant="ghost" className="size-7" disabled={updatingContent} onClick={onEdit}>
					<Edit />
				</Button>

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="size-7" disabled={updatingContent}>
							<Trash2 className="text-destructive" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem disabled={updatingContent} onClick={() => deleteContent(content.id)}>
							<div className="flex justify-between items-center w-full">
								<span className="text-destructive">Delete</span>
								<Trash2 className="text-destructive size-4" />
							</div>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
}
