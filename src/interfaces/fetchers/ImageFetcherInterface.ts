import {FetcherInterface} from "../FetcherInterface";

export interface ImageFetcherInterface extends FetcherInterface {
	fetchImage(url: string): Promise<string|null|undefined>;
}
