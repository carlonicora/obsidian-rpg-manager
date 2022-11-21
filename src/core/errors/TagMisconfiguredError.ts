import {IndexInterface} from "../../services/indexService/interfaces/IndexInterface";
import {AbstractRpgManagerError} from "./abstracts/AbstractRpgManagerError";

export class TagMisconfiguredError extends AbstractRpgManagerError {
	public index: IndexInterface;

	public showErrorMessage(
	): string {
		return '';
		/*
		let response = 'The tag `' + this.index.tag + '` is misconfigured\n' +
			'The correct tag should be ';

		let requiredId = '';
		switch (this.index.type){
			case ComponentType.Scene:
				requiredId = '/{sceneId}' + requiredId;
			case ComponentType.Act:
				requiredId = '/{actId}' + requiredId;
			case ComponentType.Adventure:
				requiredId = '/{adventureId}' + requiredId;
			default:
				requiredId = '/{campaignId}' + requiredId;
		}
		response += '`' +
			(this.api.service(TagService).dataSettings.get(this.index.type) ?? '')
			+ requiredId + '`\n';

		this.index.invalidIds?.forEach((status: IndexTagStatus, type: ComponentType) => {
			response += ' - {' + ComponentType[type].toLowerCase() + 'Index} is ' +
				(status === IndexTagStatus.Missing ? 'missing' : 'not a valid numeric indexService') + '\n';
		});

		return response;

		 */
	}

	public showErrorActions(
	): string {
		/*
		let response = 'The tag `' + this.index.tag + '` is invalid.\n' +
			'The following ids are either missing or invalid:\n';

		this.index.invalidIds?.forEach((status: IndexTagStatus, type: ComponentType) => {
			response += ' - `{' + ComponentType[type].toLowerCase() + 'Index}` is ' +
				(status === IndexTagStatus.Missing ? 'missing' : 'not a valid numeric indexService') + '\n';
		});

		return response;
		*/
		return '';
	}
}
