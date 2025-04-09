import { Button } from "@/components/ui/button";
import { Content } from "@/types";
import { WithId } from "@/util/types";
import { Edit, Trash2 } from "lucide-react";

// todo way to increase season and episode numbers easily
// todo show time if applicable
// todo use link if applicable

export default function ContentItem({ content }: { content: WithId<Content> }) {
	return (
		<div className="w-full bg-muted rounded-md p-2 flex justify-between items-center">
			<div className="flex flex-col">
				<span className="text-sm">{content.title}</span>
				<span className="text-muted-foreground text-xs">
					{content.type === "Series" ? `S${content.season} E${content.episode}` : "Film"}
				</span>
			</div>
			<div className="flex gap-1">
				<Button variant="ghost" className="size-7">
					<Edit />
				</Button>
				<Button variant="ghost" className="size-7">
					<Trash2 className="text-destructive" />
				</Button>
			</div>
		</div>
	);
}
