import {IndexInterface} from "../../services/indexService/interfaces/IndexInterface";
import {AbstractRpgManagerError} from "./abstracts/AbstractRpgManagerError";

export class ComponentNotFoundError extends AbstractRpgManagerError {
	public index: IndexInterface;

	public showErrorMessage(
	): string {
		return 'COMPONENT NOT FOUND';
		/*
		const response = 'The tag `' + this.index.tag + '` refers to an outline that does not exist.\n';

		let check = 'Please check you have the following Outlines:\n';
		this.index.possiblyNotFoundIds?.forEach((id: string, type: ComponentType) => {
			check += ' - ' + ComponentType[type].toLowerCase() + ' with an indexService of `' + id.toString() + '`\n';
		});

		return response + check;

		 */
	}

	public showErrorActions(
	): string {
		return '';
		/*
		let response = 'The tag `' + this.index.tag + '` refers to a non-existing outline.\n' +
			'The following ids might be either missing or invalid:\n';

		this.index.possiblyNotFoundIds?.forEach((id: string, type: ComponentType) => {
			response += ' - ' + ComponentType[type].toLowerCase() + ' with an indexService of `' + id.toString() + '`\n';
		});

		return response;

		 */
	}
}
