import {FetcherInterface} from "../../managers/fetchersManager/interfaces/FetcherInterface";
import {RpgManagerApiInterface} from "../../api/interfaces/RpgManagerApiInterface";

export class AbstractFetcher implements FetcherInterface{
	public fetchUrl: string;

	constructor(
		protected api: RpgManagerApiInterface,
	) {
	}
}
