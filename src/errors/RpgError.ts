import {DataType} from "../enums/DataType";
import {RpgErrorInterface} from "../interfaces/RpgErrorInterface";
import {App} from "obsidian";

export class RpgError extends Error implements RpgErrorInterface{
	constructor(
		protected app: App,
		public type: DataType,
		public tag: string|undefined,
		public campaignId: number|undefined=undefined,
		public adventureId: number|undefined=undefined,
		public sessionId: number|undefined=undefined,
		public sceneId: number|undefined=undefined,
	) {
		super();
	}

	public showErrorMessage(
	): string {
		let response = '';

		if (this.tag !== undefined){
			this.campaignId = this.app.plugins.getPlugin('rpg-manager').tagManager.getId(DataType.Campaign, this.tag);
			this.adventureId = this.app.plugins.getPlugin('rpg-manager').tagManager.getId(DataType.Adventure, this.tag);
			this.sessionId = this.app.plugins.getPlugin('rpg-manager').tagManager.getId(DataType.Session, this.tag);
			this.sceneId = this.app.plugins.getPlugin('rpg-manager').tagManager.getId(DataType.Scene, this.tag);
		}

		switch (this.type){
			case DataType.Scene:
				response = 'sceneId: ' + (this.sceneId ?? '_missing id_') + '\n' + response;
			case DataType.Note:
			case DataType.Session:
				response = 'sessionId: ' + (this.sessionId ?? '_missing id_') + '\n' + response;
			case DataType.Adventure:
				response = 'adventureId: ' + (this.adventureId ?? '_missing id_') + '\n' + response;
			default:
				response = 'campaignId: ' + (this.campaignId ?? '_missing id_') + '\n' + response;
				break;
		}

		return response;
	}
}
