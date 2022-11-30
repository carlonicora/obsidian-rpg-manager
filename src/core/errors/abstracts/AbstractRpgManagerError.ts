import {RpgErrorInterface} from "../interfaces/RpgErrorInterface";
import {IndexInterface} from "../../../services/indexService/interfaces/IndexInterface";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";

export abstract class AbstractRpgManagerError extends Error implements RpgErrorInterface {
	constructor(
		public api: RpgManagerApiInterface,
		public index: IndexInterface|undefined,
	) {
		super();
	}

	public getErrorTitle(
	): string|undefined {
		return undefined;
	}

	public abstract showErrorMessage(
	): string;

	public abstract showErrorActions(
	): string;

	public getErrorLinks(
	): string[]|undefined {
		return undefined;
	}
}
