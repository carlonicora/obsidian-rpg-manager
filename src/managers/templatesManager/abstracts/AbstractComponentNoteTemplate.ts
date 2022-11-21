import {ComponentNotesInterface} from "../interfaces/ComponentNotesInterface";
import {ComponentType} from "../../../core/enums/ComponentType";
import {IndexInterface} from "../../../services/indexService/interfaces/IndexInterface";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";
import {IndexService} from "../../../services/indexService/IndexService";

export abstract class AbstractComponentNoteTemplate implements ComponentNotesInterface {
	protected type: ComponentType;
	protected id: IndexInterface|undefined;

	constructor(
		protected api: RpgManagerApiInterface,
		protected name: string,
		protected campaignId: number|undefined,
		protected adventureId: number|undefined,
		protected actId: number|undefined,
		protected sceneId: number|undefined,
		protected sessionId: number|undefined,
		protected additionalInformation: any|undefined,
	) {
		if (campaignId !== undefined)
			this.id = this.api.service(IndexService).create(this.type, campaignId, adventureId, actId, sceneId, sessionId);

	}
	
	abstract getContent(): string;
}
