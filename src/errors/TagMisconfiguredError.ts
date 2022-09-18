import {RpgError} from "./RpgError";
import {DataType} from "../enums/DataType";
import {TagStatus} from "../enums/TagStatus";

export class TagMisconfiguredError extends RpgError {
	public showErrorMessage(
	): string {
		let response = 'The tag `' + this.idMap.tag + '` is misconfigured\n';

		this.idMap.invalidIds?.forEach((status: TagStatus, type: DataType) => {
			response += '{' + DataType[type].toLowerCase() + 'Id} is ' +
				(status === TagStatus.Missing ? 'missing' : 'not a valid numeric id') + '\n';
		});

		return response;
	}
}
