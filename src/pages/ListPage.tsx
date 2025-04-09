import ContentItem from "@/components/ContentItem";
import { Button } from "@/components/ui/button";
import { Content } from "@/types";
import { WithId } from "@/util/types";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function ListPage() {
	const [content, setContent] = useState<WithId<Content>[]>([
		{ id: "1", title: "Film 1", type: "Film" },
		{ id: "2", title: "Film 2", type: "Film" },
		{ id: "3", title: "Series 1", type: "Series", season: 1, episode: 1 },
		{ id: "4", title: "Series 2", type: "Series", season: 1, episode: 1 },
	]);

	return (
		<div className="flex flex-col justify-center items-center gap-4 w-full max-w-96">
			<span className="text-2xl font-semibold">Watcherr3</span>
			<div className="w-full flex flex-col justify-center items-center gap-2">
				<Button variant="outline" className="w-full">
					<Plus />
					<span>Add New</span>
				</Button>
				<div className="w-full flex flex-col justify-center items-center gap-2">
					{content.map((content, index) => (
						<ContentItem key={index} content={content} />
					))}
				</div>
			</div>
		</div>
	);
}
