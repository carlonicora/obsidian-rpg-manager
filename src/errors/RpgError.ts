import {RpgErrorInterface} from "../interfaces/RpgErrorInterface";
import {App} from "obsidian";
import {TagValidator} from "../helpers/TagValidator";

export abstract class RpgError extends Error implements RpgErrorInterface {
	constructor(
		protected app: App,
		public idMap: TagValidator,
	) {
		super();
	}

	public getErrorTitle(
	): string|undefined {
		return undefined;
	}

	public abstract showErrorMessage(
	): string;
}
