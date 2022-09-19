import {AbstractRpgError} from "../abstracts/AbstractRpgError";

export class MultipleRpgManagerTagsError extends AbstractRpgError {
	public showErrorMessage(
	): string {
		const response = 'The file contains more than one RPG Manager identifier tags.\n' +
			'Only one RPG Manager Tag can be present in one file.'

		return response;
	}

	public showErrorActions(
	): string {
		return this.showErrorMessage();
	}
}
