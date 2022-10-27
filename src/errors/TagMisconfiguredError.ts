import {ComponentType} from "../core/enums/ComponentType";
import {IdTagStatus} from "../services/idService/enums/IdTagStatus";
import {IdInterface} from "../services/idService/interfaces/IdInterface";
import {AbstractRpgManagerError} from "./abstracts/AbstractRpgManagerError";
import {TagService} from "../services/tagService/TagService";

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
			(this.api.service(TagService).dataSettings.get(this.id.type) ?? '')
			+ requiredId + '`\n';

		this.id.invalidIds?.forEach((status: IdTagStatus, type: ComponentType) => {
			response += ' - {' + ComponentType[type].toLowerCase() + 'Id} is ' +
				(status === IdTagStatus.Missing ? 'missing' : 'not a valid numeric idService') + '\n';
		});

		return response;
	}

	public showErrorActions(
	): string {
		let response = 'The tag `' + this.id.tag + '` is invalid.\n' +
			'The following ids are either missing or invalid:\n';

		this.id.invalidIds?.forEach((status: IdTagStatus, type: ComponentType) => {
			response += ' - `{' + ComponentType[type].toLowerCase() + 'Id}` is ' +
				(status === IdTagStatus.Missing ? 'missing' : 'not a valid numeric idService') + '\n';
		});

		return response;
	}
}
