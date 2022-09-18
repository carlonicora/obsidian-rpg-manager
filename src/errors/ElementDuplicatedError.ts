import {RpgError} from "./RpgError";
import {DataType} from "../enums/DataType";

export class ElementDuplicatedError extends RpgError{
	public showErrorMessage(
	): string {
		let response = '';
		response += '**Two elements with the same id exists in the data.**\n' +
			'You should only have one unique identifier for a ' + DataType[this.idMap.type] + '\n';

		return response;
	}
}
