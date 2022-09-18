import {RpgError} from "./RpgError";
import {App} from "obsidian";
import {Id} from "../database/Id";

export class MultipleRpgManagerTagsError extends RpgError {
	public showErrorMessage(
	): string {
		let response = 'The file contains more than one RPG Manager identifier tags.\n' +
			'Only one RPG Manager Tag can be present in one file.'

		return response;
	}
}
