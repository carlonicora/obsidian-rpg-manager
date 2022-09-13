import {AbstractFactory} from "../abstracts/AbstractFactory";
import {FetcherInterface} from "../interfaces/FetcherInterface";
import {App} from "obsidian";
import {FetcherType} from "../enums/FetcherType";
import {YouTubeImageFetcher} from "../fetchers/YouTubeImageFetcher";

export class FetcherFactory extends AbstractFactory {
	private fetchers: Map<FetcherType, FetcherInterface>;

	constructor(
		app: App,
	) {
		super(app);

		this.fetchers = new Map();
		this.fetchers.set(FetcherType.YouTubeImage, YouTubeImageFetcher);
	}

	public create<T>(
		type: FetcherType,
	): T {
		const fetcher: any|undefined = this.fetchers.get(type);

		if (fetcher === undefined) throw new Error('Fetcher ' + FetcherType[type] + 'not configured');

		return new fetcher(this.app);
	}
}
