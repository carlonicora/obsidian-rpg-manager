import {AbstractFactory} from "../abstracts/AbstractFactory";
import {App} from "obsidian";
import {AbstractFetcher} from "../abstracts/AbstractFetcher";

export class FetcherFactory extends AbstractFactory {
	public async create<T extends AbstractFetcher>(
		fetcherType: (new (app: App) => T),
	): Promise<T> {
		return new fetcherType(this.app);
	}

	/*
	public create<T>(
		type: FetcherType,
	): T {
		const fetcher: any|undefined = this.fetchers.get(type);

		if (fetcher === undefined) throw new Error('Fetcher ' + FetcherType[type] + 'not configured');

		return new fetcher(this.app);
	}
	*/
}
