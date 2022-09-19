import {AbstractRpgError} from "../abstracts/AbstractRpgError";
import {DataType} from "../enums/DataType";
import {TagStatus} from "../enums/TagStatus";

export class TagMisconfiguredError extends AbstractRpgError {
	public showErrorMessage(
	): string {
		let response = 'The tag `' + this.idMap.tag + '` is misconfigured\n' +
			'The correct tag should be ';

		let requiredId = '';
		switch (this.idMap.type){
			case DataType.Scene:
				requiredId = '/{sceneId}' + requiredId;
			case DataType.Session:
			case DataType.Note:
				requiredId = '/{sessionId}' + requiredId;
			case DataType.Adventure:
				requiredId = '/{adventureId}' + requiredId;
			default:
				requiredId = '/{campaignId}' + requiredId;
		}
		response += '`' +
			(this.app.plugins.getPlugin('rpg-manager').factories.tags.dataSettings.get(this.idMap.type) ?? '')
			+ requiredId + '`\n';

		this.idMap.invalidIds?.forEach((status: TagStatus, type: DataType) => {
			response += ' - {' + DataType[type].toLowerCase() + 'Id} is ' +
				(status === TagStatus.Missing ? 'missing' : 'not a valid numeric id') + '\n';
		});

		return response;
	}

	public showErrorActions(
	): string {
		let response = 'The tag `' + this.idMap.tag + '` is invalid.\n' +
			'The following ids are either missing or invalid:\n';

		this.idMap.invalidIds?.forEach((status: TagStatus, type: DataType) => {
			response += ' - `{' + DataType[type].toLowerCase() + 'Id}` is ' +
				(status === TagStatus.Missing ? 'missing' : 'not a valid numeric id') + '\n';
		});

		return response;
	}
}
