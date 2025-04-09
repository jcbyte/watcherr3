import { Content } from "@/types";
import { WithId } from "@/util/types";
import { getAuth, User } from "firebase/auth";
import {
	addDoc,
	collection,
	CollectionReference,
	deleteDoc,
	doc,
	getDocs,
	getFirestore,
	orderBy,
	query,
	setDoc,
	Timestamp,
} from "firebase/firestore";
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
	const contentQuery = query(contentRef, orderBy("lastUpdated", "desc"));
	const contentSnaps = await getDocs(contentQuery);

	const contentList = contentSnaps.docs.map((contentDoc) => {
		const contentData = contentDoc.data() as FirebaseContent;
		const { lastUpdated, ...content } = contentData;
		return { id: contentDoc.id, ...content };
	});
	return contentList;
}

export async function addContent(content: Content): Promise<void> {
	const contentData: FirebaseContent = {
		lastUpdated: Timestamp.now(),
		...content,
	};

	const contentRef = getUserContentRef();

	await addDoc(contentRef, contentData);
}

export async function editContent(content: WithId<Content>): Promise<void> {
	const { id: contentId, ...strippedContent } = content;
	const contentData: FirebaseContent = {
		lastUpdated: Timestamp.now(),
		...strippedContent,
	};

	const contentRef = getUserContentRef();
	const contentDocRef = doc(contentRef, contentId);
	await setDoc(contentDocRef, contentData);
}

export async function deleteContent(contentId: string) {
	const contentRef = getUserContentRef();
	const contentDocRef = doc(contentRef, contentId);
	await deleteDoc(contentDocRef);
}
