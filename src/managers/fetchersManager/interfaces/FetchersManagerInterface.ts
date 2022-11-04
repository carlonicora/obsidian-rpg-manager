import {FetcherInterface} from "./FetcherInterface";
import {ClassInterface} from "../../../api/interfaces/ClassInterface";

export interface FetchersManagerInterface {
	get<T extends FetcherInterface>(
		fetcherClass: ClassInterface<T>,
	): T;

	register<T extends FetcherInterface>(
		fetcherClass: ClassInterface<T>,
	): void;
}
