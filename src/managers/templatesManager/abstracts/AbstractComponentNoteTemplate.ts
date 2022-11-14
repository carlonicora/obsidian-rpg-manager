import {ComponentNotesInterface} from "../interfaces/ComponentNotesInterface";
import {ComponentType} from "../../../core/enums/ComponentType";
import {IdInterface} from "../../../services/idService/interfaces/IdInterface";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";
import {IdService} from "../../../services/idService/IdService";

export abstract class AbstractComponentNoteTemplate implements ComponentNotesInterface {
	protected type: ComponentType;
	protected id: IdInterface|undefined;

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
			this.id = this.api.service(IdService).create(this.type, campaignId, adventureId, actId, sceneId, sessionId);

	}
	
	abstract getContent(): string;
}
