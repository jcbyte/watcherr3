import { Content } from "@/types";
import { WithId } from "@/util/types";
import { getAuth, User } from "firebase/auth";
import { collection, CollectionReference, getDocs, getFirestore, orderBy, query, Timestamp } from "firebase/firestore";
import { app } from "./firebase";

const db = getFirestore(app);

type FirebaseContent = Content & {
	lastUpdated: Timestamp;
};

function getUser(): User {
	const user = getAuth().currentUser;
	if (!user) throw new Error("User not signed in");

	return user;
}

function getUserContentRef(): CollectionReference {
	const user = getUser();
	return collection(db, "users", user.uid, "content");
}

export async function getContentList(): Promise<WithId<Content>[]> {
	const contentRef = getUserContentRef();
	const contentQuery = query(contentRef, orderBy("lastUpdated"));
	const contentSnaps = await getDocs(contentQuery);

	const contentList = contentSnaps.docs.map((contentDoc) => {
		const contentData = contentDoc.data() as FirebaseContent;
		const { lastUpdated, ...content } = contentData;
		return { id: contentDoc.id, ...content };
	});
	return contentList;
}
