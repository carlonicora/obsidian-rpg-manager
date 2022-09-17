import {AbstractFactory} from "../abstracts/AbstractFactory";
import {FetcherInterface} from "../interfaces/FetcherInterface";
import {App} from "obsidian";
import {FetcherType} from "../enums/FetcherType";
import {YouTubeImageFetcher} from "../fetchers/YouTubeImageFetcher";
import {AbstractComponent} from "../abstracts/AbstractComponent";
import {RelationshipInterface} from "../interfaces/RelationshipInterface";
import {ResponseElementInterface} from "../interfaces/response/ResponseElementInterface";
import {ComponentInterface} from "../interfaces/ComponentInterface";
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
