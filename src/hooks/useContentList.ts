import { syncContentList } from "@/firebase/firestore";
import { Content } from "@/types";
import { WithId } from "@/util/types";
import { useEffect, useState } from "react";

export default function useContentList() {
	const [content, setContent] = useState<WithId<Content>[]>();

	useEffect(() => {
		const unsubscribe = syncContentList(setContent);
		return unsubscribe;
	}, []);

	return { content };
}
