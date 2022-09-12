import {TemplateInterface} from "../interfaces/TemplateInterface";
import {App} from "obsidian";

export abstract class AbstractTemplate implements TemplateInterface {
	constructor(
		protected app: App,
		protected name: string,
		protected campaignId: number|null,
		protected adventureId: number|null,
		protected sessionId: number|null,
		protected sceneId: number|null,
		protected additionalInformation: any|null,
	) {
	}
	
	abstract getContent(): string;
}
