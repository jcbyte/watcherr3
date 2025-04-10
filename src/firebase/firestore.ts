import { Content } from "@/types";
import { ReactSetter, WithId } from "@/util/types";
import { getAuth, Unsubscribe, User } from "firebase/auth";
import {
	addDoc,
	collection,
	CollectionReference,
	deleteDoc,
	doc,
	DocumentSnapshot,
	getFirestore,
	onSnapshot,
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

export function syncContentList(setContentList: ReactSetter<WithId<Content>[] | undefined>): Unsubscribe {
	const contentRef = getUserContentRef();
	// orderBy only relevant on the initial load
	const contentQuery = query(contentRef, orderBy("lastUpdated", "desc"));

	function getDocContent(doc: DocumentSnapshot): WithId<Content> {
		const contentData = doc.data() as FirebaseContent;
		const { lastUpdated, ...content } = contentData;
		return { id: doc.id, ...content };
	}

	let initialLoad = true;

	const unsubscribe = onSnapshot(contentQuery, (snapshot) => {
		if (initialLoad) {
			// Initially load as given (in order)
			const contentList = snapshot.docs.map((doc) => getDocContent(doc));
			setContentList(contentList);
			initialLoad = false;
		} else {
			// Subsequently modify keeping the same order
			setContentList((prev) => {
				if (!prev) throw new Error("Content list has not been initialised properly.");

				let newContentList = [...prev];

				snapshot.docChanges().forEach((change) => {
					if (change.type === "added") {
						newContentList = [getDocContent(change.doc), ...newContentList];
					} else if (change.type === "modified") {
						newContentList = newContentList.map((existingContent) =>
							existingContent.id !== change.doc.id ? existingContent : getDocContent(change.doc)
						);
					} else if (change.type === "removed") {
						newContentList = newContentList.filter((existingContent) => existingContent.id !== change.doc.id);
					}
				});

				return newContentList;
			});
		}
	});

	return unsubscribe;
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
