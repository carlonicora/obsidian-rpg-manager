import {ComponentType} from "../enums/ComponentType";
import {IdInterface} from "../../services/idService/interfaces/IdInterface";
import {AbstractRpgManagerError} from "./abstracts/AbstractRpgManagerError";

export class ComponentNotFoundError extends AbstractRpgManagerError {
	public id: IdInterface;

	public showErrorMessage(
	): string {
		const response = 'The tag `' + this.id.tag + '` refers to an outline that does not exist.\n';

		let check = 'Please check you have the following Outlines:\n';
		this.id.possiblyNotFoundIds?.forEach((id: number, type: ComponentType) => {
			check += ' - ' + ComponentType[type].toLowerCase() + ' with an idService of `' + id.toString() + '`\n';
		});

		return response + check;
	}

	public showErrorActions(
	): string {
		let response = 'The tag `' + this.id.tag + '` refers to a non-existing outline.\n' +
			'The following ids might be either missing or invalid:\n';

		this.id.possiblyNotFoundIds?.forEach((id: number, type: ComponentType) => {
			response += ' - ' + ComponentType[type].toLowerCase() + ' with an idService of `' + id.toString() + '`\n';
		});

		return response;
	}
}
