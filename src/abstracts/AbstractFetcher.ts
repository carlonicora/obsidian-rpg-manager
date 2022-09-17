import {App} from "obsidian";
import {FetcherInterface} from "../interfaces/FetcherInterface";

export class AbstractFetcher implements FetcherInterface{
	public fetchUrl: string;

	constructor(
		protected app: App,
	) {
	}
}
