import {RpgError} from "./RpgError";
import {DataType} from "../enums/DataType";

export class TagMisconfiguredError extends RpgError {
	public showErrorMessage(
	): string {
		let response = super.showErrorMessage();
		response += '**The RPG Manager is not correctly configured**\n';

		let requiredIds = '';
		switch (this.type) {
			case DataType.Scene:
				requiredIds = '/{sceneId}' + requiredIds;
			case DataType.Session:
			case DataType.Note:
				requiredIds = '/{sessionId}' + requiredIds;
			case DataType.Adventure:
				requiredIds = '/{adventureId}' + requiredIds;
		}
		requiredIds = '/{campaignId}' + requiredIds;

		response += 'The correct format MUST be: `' + this.app.plugins.getPlugin('rpg-manager').tagManager.dataSettings.get(this.type) + requiredIds + '` (_with all the ids being numbers_)\n';

		return response;
	}
}
