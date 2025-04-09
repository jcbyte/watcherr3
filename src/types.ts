export interface Watchable {
	title: string;
	link?: string;
	time?: number;
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
