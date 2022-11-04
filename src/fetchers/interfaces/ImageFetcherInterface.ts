import {FetcherInterface} from "../../managers/fetchersManager/interfaces/FetcherInterface";

export interface ImageFetcherInterface extends FetcherInterface {
	fetchImage(url: string): Promise<string|null|undefined>;
}
