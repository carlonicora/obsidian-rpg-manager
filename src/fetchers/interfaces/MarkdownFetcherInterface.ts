import {FetcherInterface} from "../../managers/fetchersManager/interfaces/FetcherInterface";

export interface MarkdownFetcherInterface  extends FetcherInterface {
	fetchMarkdown(): Promise<string|null|undefined>;
}
