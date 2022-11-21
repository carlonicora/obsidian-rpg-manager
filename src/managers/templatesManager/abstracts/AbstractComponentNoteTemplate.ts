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
		protected campaignId?: string,
		protected adventureId?: string,
		protected actId?: string,
		protected sceneId?: string,
		protected sessionId?: string,
		protected positionInParent?: number,
		protected additionalInformation?: any,
	) {
		if (campaignId !== undefined)
			this.id = this.api.service(IndexService).create(this.type, campaignId, adventureId, actId, sceneId, sessionId);

	}
	
	abstract getContent(): string;
}
