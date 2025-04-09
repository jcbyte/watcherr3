import { getContentList } from "@/firebase/firestore";
import { Content } from "@/types";
import { WithId } from "@/util/types";
import { useEffect, useState } from "react";

// todo check why this is updating the way it does
export default function useContentList() {
	const [content, setContent] = useState<WithId<Content>[]>();

	useEffect(() => {
		getContentList().then((contentList) => {
			setContent(contentList);
		});
	});

	return { content };
}
