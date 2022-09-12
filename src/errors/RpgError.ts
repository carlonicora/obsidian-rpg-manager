import {DataType} from "../enums/DataType";
import {RpgErrorInterface} from "../interfaces/RpgErrorInterface";
import {App} from "obsidian";

export class RpgError extends Error implements RpgErrorInterface{
	constructor(
		protected app: App,
		public type: DataType,
		public tag: string|undefined,
		public campaignId: number|null = null,
		public adventureId: number|null=null,
		public sessionId: number|null=null,
		public sceneId: number|null=null,
	) {
		super();
	}

	public showErrorMessage(
	): string {
		let response = '';
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
