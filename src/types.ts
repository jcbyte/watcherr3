interface Watchable {
	title: string;
	link?: string;
	time?: string;
}

interface Film extends Watchable {
	type: "Film";
}

interface Series extends Watchable {
	type: "Series";
	season: number;
	episode: number;
}

export type Content = Film | Series;
