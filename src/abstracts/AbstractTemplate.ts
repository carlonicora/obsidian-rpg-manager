import {TemplateInterface} from "../interfaces/TemplateInterface";
import {App} from "obsidian";

export abstract class AbstractTemplate implements TemplateInterface {
	constructor(
		protected app: App,
		protected name: string,
		protected campaignId: number|undefined,
		protected adventureId: number|undefined,
		protected sessionId: number|undefined,
		protected sceneId: number|undefined,
		protected additionalInformation: any|undefined,
	) {
	}
	
	abstract getContent(): string;
}
