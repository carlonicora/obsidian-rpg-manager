import {ComponentNotesTemplateFactoryInterface} from "../factories/interfaces/ComponentNotesTemplateFactoryInterface";
import {App} from "obsidian";
import {AbstractRpgManager} from "../../abstracts/AbstractRpgManager";
import {ComponentType} from "../../databases/enums/ComponentType";
import {IdInterface} from "../../databases/interfaces/IdInterface";

export abstract class AbstractTemplate extends AbstractRpgManager implements ComponentNotesTemplateFactoryInterface {
	protected type: ComponentType;
	protected id: IdInterface|undefined;

	constructor(
		app: App,
		protected name: string,
		protected campaignId: number|undefined,
		protected adventureId: number|undefined,
		protected actId: number|undefined,
		protected sceneId: number|undefined,
		protected sessionId: number|undefined,
		protected additionalInformation: any|undefined,
	) {
		super(app);

		if (campaignId !== undefined) this.id = this.factories.id.create(this.type, campaignId, adventureId, actId, sceneId, sessionId);
	}
	
	abstract getContent(): string;
}
