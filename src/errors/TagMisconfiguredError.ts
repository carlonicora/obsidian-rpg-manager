import {AbstractRpgError} from "../abstracts/AbstractRpgError";
import {RecordType} from "../enums/RecordType";
import {TagStatus} from "../enums/TagStatus";

export class TagMisconfiguredError extends AbstractRpgError {
	public showErrorMessage(
	): string {
		let response = 'The tag `' + this.id.tag + '` is misconfigured\n' +
			'The correct tag should be ';

		let requiredId = '';
		switch (this.id.type){
			case RecordType.Scene:
				requiredId = '/{sceneId}' + requiredId;
			case RecordType.Session:
			case RecordType.Note:
				requiredId = '/{sessionId}' + requiredId;
			case RecordType.Adventure:
				requiredId = '/{adventureId}' + requiredId;
			default:
				requiredId = '/{campaignId}' + requiredId;
		}
		response += '`' +
			(this.app.plugins.getPlugin('rpg-manager').tagHelper.dataSettings.get(this.id.type) ?? '')
			+ requiredId + '`\n';

		this.id.invalidIds?.forEach((status: TagStatus, type: RecordType) => {
			response += ' - {' + RecordType[type].toLowerCase() + 'Id} is ' +
				(status === TagStatus.Missing ? 'missing' : 'not a valid numeric id') + '\n';
		});

		return response;
	}

	public showErrorActions(
	): string {
		let response = 'The tag `' + this.id.tag + '` is invalid.\n' +
			'The following ids are either missing or invalid:\n';

		this.id.invalidIds?.forEach((status: TagStatus, type: RecordType) => {
			response += ' - `{' + RecordType[type].toLowerCase() + 'Id}` is ' +
				(status === TagStatus.Missing ? 'missing' : 'not a valid numeric id') + '\n';
		});

		return response;
	}
}
