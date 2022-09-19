import {RpgErrorInterface} from "../interfaces/RpgErrorInterface";
import {App} from "obsidian";
import {IdInterface} from "../interfaces/data/IdInterface";

export abstract class AbstractRpgError extends Error implements RpgErrorInterface {
	constructor(
		protected app: App,
		public id: IdInterface,
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
	): Array<string>|undefined {
		return undefined;
	}
}
