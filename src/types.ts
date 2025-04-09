interface Watchable {
	title: string;
	link?: string;
	time?: string;
}

interface Film extends Watchable {
	type: "film";
}

interface Series extends Watchable {
	type: "series";
	season: number;
	episode: number;
}

export type Content = Film | Series;
