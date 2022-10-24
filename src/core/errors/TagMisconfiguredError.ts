import {AbstractRpgManagerError} from "../abstracts/AbstractRpgManagerError";
import {ComponentType} from "../enums/ComponentType";
import {TagStatus} from "../../services/id/enums/TagStatus";
import {IdInterface} from "../../services/id/interfaces/IdInterface";

export class TagMisconfiguredError extends AbstractRpgManagerError {
	public id: IdInterface;

	public showErrorMessage(
	): string {
		let response = 'The tag `' + this.id.tag + '` is misconfigured\n' +
			'The correct tag should be ';

		let requiredId = '';
		switch (this.id.type){
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
			(this.tagHelper.dataSettings.get(this.id.type) ?? '')
			+ requiredId + '`\n';

		this.id.invalidIds?.forEach((status: TagStatus, type: ComponentType) => {
			response += ' - {' + ComponentType[type].toLowerCase() + 'Id} is ' +
				(status === TagStatus.Missing ? 'missing' : 'not a valid numeric id') + '\n';
		});

		return response;
	}

	public showErrorActions(
	): string {
		let response = 'The tag `' + this.id.tag + '` is invalid.\n' +
			'The following ids are either missing or invalid:\n';

		this.id.invalidIds?.forEach((status: TagStatus, type: ComponentType) => {
			response += ' - `{' + ComponentType[type].toLowerCase() + 'Id}` is ' +
				(status === TagStatus.Missing ? 'missing' : 'not a valid numeric id') + '\n';
		});

		return response;
	}
}
