import { Content } from "@/types";
import { WithId } from "@/util/types";

export default function ContentItem({ content }: { content: WithId<Content> }) {
	return <div>{content.title}</div>;
}
