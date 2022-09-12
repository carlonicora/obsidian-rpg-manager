import {RpgError} from "./RpgError";

export class HiddenError extends RpgError {
	public showErrorMessage(
	): string {
		return '';
	}
}
