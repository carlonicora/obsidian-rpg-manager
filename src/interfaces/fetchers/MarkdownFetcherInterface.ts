import {FetcherInterface} from "../FetcherInterface";

export interface MarkdownFetcherInterface  extends FetcherInterface {
	fetchMarkdown(): Promise<string|null|undefined>;
}
