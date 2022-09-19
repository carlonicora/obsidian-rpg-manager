import {AbstractRpgError} from "../abstracts/AbstractRpgError";
import {DataType} from "../enums/DataType";

export class ElementNotFoundError extends AbstractRpgError {
	public showErrorMessage(
	): string {
		const response = 'The tag `' + this.id.tag + '` refers to an outline that does not exist.\n';

		let check = 'Please check you have the followinf Outlines:\n';
		this.id.possiblyNotFoundIds?.forEach((id: number, type: DataType) => {
			check += ' - ' + DataType[type].toLowerCase() + ' with an id of `' + id.toString() + '`\n';
		});

		return response + check;
	}

	public showErrorActions(
	): string {
		let response = 'The tag `' + this.id.tag + '` refers to a non-existing outline.\n' +
			'The following ids might be either missing or invalid:\n';

		this.id.possiblyNotFoundIds?.forEach((id: number, type: DataType) => {
			response += ' - ' + DataType[type].toLowerCase() + ' with an id of `' + id.toString() + '`\n';
		});

		return response;
	}
}
