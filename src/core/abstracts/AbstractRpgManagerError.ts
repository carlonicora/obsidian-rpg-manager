import {RpgErrorInterface} from "../interfaces/RpgErrorInterface";
import {IdInterface} from "../../services/idService/interfaces/IdInterface";
import {RpgManagerApiInterface} from "../../api/interfaces/RpgManagerApiInterface";

export abstract class AbstractRpgManagerError extends Error implements RpgErrorInterface {
	constructor(
		public api: RpgManagerApiInterface,
		public id: IdInterface|undefined,
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
