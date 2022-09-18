import {RpgError} from "./RpgError";
import {DataType} from "../enums/DataType";

export class ElementNotFoundError extends RpgError {

	public showErrorMessage(
	): string {
		const response = 'The tag `' + this.idMap.tag + '` refers to an outline that does not exist.\n';

		let check = 'Please check you have the followinf Outlines:\n';
		this.idMap.possiblyNotFoundIds?.forEach((id: number, type: DataType) => {
			check += ' - ' + DataType[type].toLowerCase() + ' with an id of `' + id.toString() + '`\n';
		});

		return response + check;
	}
}
