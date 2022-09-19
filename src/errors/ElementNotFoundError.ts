import {AbstractRpgError} from "../abstracts/AbstractRpgError";
import {DataType} from "../enums/DataType";
import {TagStatus} from "../enums/TagStatus";

export class ElementNotFoundError extends AbstractRpgError {

	public showErrorMessage(
	): string {
		const response = 'The tag `' + this.idMap.tag + '` refers to an outline that does not exist.\n';

		let check = 'Please check you have the followinf Outlines:\n';
		this.idMap.possiblyNotFoundIds?.forEach((id: number, type: DataType) => {
			check += ' - ' + DataType[type].toLowerCase() + ' with an id of `' + id.toString() + '`\n';
		});

		return response + check;
	}

	public showErrorActions(
	): string {
		let response = 'The tag `' + this.idMap.tag + '` refers to a non-existing outline.\n' +
			'The following ids might be either missing or invalid:\n';

		this.idMap.possiblyNotFoundIds?.forEach((id: number, type: DataType) => {
			response += ' - ' + DataType[type].toLowerCase() + ' with an id of `' + id.toString() + '`\n';
		});

		return response;
	}
}
