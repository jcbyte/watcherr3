import { Content } from "@/types";
import { useState } from "react";
import ContentItem from "./components/ContentItem";
import { WithId } from "./util/types";

export default function App() {
	const [content, setContent] = useState<WithId<Content>[]>([
		{ id: "1", title: "Film 1", type: "Film" },
		{ id: "2", title: "Film 2", type: "Film" },
		{ id: "3", title: "Series 1", type: "Series", season: 1, episode: 1 },
		{ id: "4", title: "Series 2", type: "Series", season: 1, episode: 1 },
	]);

	return (
		<div className="flex flex-col gap-2">
			{content.map((content, index) => (
				<ContentItem key={index} content={content} />
			))}
		</div>
	);
}
