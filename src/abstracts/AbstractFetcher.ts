import {FetcherInterface} from "../interfaces/FetcherInterface";
import {AbstractRpgManager} from "./AbstractRpgManager";

export class AbstractFetcher extends AbstractRpgManager implements FetcherInterface{
	public fetchUrl: string;
}
