import {FetchersManagerInterface} from "./interfaces/FetchersManagerInterface";
import {RpgManagerApiInterface} from "../../api/interfaces/RpgManagerApiInterface";
import {ClassInterface} from "../../api/interfaces/ClassInterface";
import {FetcherInterface} from "./interfaces/FetcherInterface";

export class FetchersManager implements FetchersManagerInterface {
	private _fetchers: Map<ClassInterface<FetcherInterface>, FetcherInterface> = new Map<ClassInterface<FetcherInterface>, FetcherInterface>();
	constructor(
		private _api: RpgManagerApiInterface,
	) {
	}

	public get<T extends FetcherInterface>(
		fetcherClass: ClassInterface<T>,
	): T {
		return this._fetchers.get(fetcherClass) as T;
	}

	public register<T extends FetcherInterface>(
		fetcherClass: ClassInterface<T>,
	): void {
		this._fetchers.set(fetcherClass, new fetcherClass(this._api));
	}
}
