import { Button } from "@/components/ui/button";
import { deleteContent } from "@/firebase/firestore";
import { Content } from "@/types";
import { WithId } from "@/util/types";
import { ChevronRight, Dot, Edit, Trash2 } from "lucide-react";

// todo way to increase season and episode numbers easily
// todo show time if applicable
// todo use link if applicable

export default function ContentItem({ content, onEdit }: { content: WithId<Content>; onEdit: () => void }) {
	return (
		<div className="w-full bg-card rounded-md p-2 flex justify-between items-center">
			<div className="flex flex-col">
				<span className="text-sm">{content.title}</span>
				{content.type === "series" && (
					<div className="flex justify-center items-center gap-1">
						<div className="flex justify-center items-center">
							<span className="text-muted-foreground text-sm">Season {content.season}</span>
							<div className="p-0.5 bg-card hover:bg-muted duration-200 rounded-full" onClick={() => {}}>
								<ChevronRight className="size-[1.2rem]" />
							</div>
						</div>
						<Dot className="text-muted-foreground -ml-2 size-4" />
						<div className="flex justify-center items-center gap-1">
							<span className="text-muted-foreground text-sm">Episode {content.episode}</span>
							<div className="p-0.5 bg-card hover:bg-muted duration-200 rounded-full" onClick={() => {}}>
								<ChevronRight className="size-[1.2rem]" />
							</div>
						</div>
					</div>
				)}
			</div>
			<div className="flex gap-1">
				<Button variant="ghost" className="size-7" onClick={onEdit}>
					<Edit />
				</Button>
				<Button variant="ghost" className="size-7" onClick={() => deleteContent(content.id)}>
					<Trash2 className="text-destructive" />
				</Button>
			</div>
		</div>
	);
}
