import {ComponentNotesInterface} from "../interfaces/ComponentNotesInterface";
import {ComponentType} from "../../../core/enums/ComponentType";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";

export abstract class AbstractComponentNoteTemplate implements ComponentNotesInterface {
	protected type: ComponentType;

	constructor(
		protected api: RpgManagerApiInterface,
		protected campaignId?: string,
	) {
	}
	
	abstract getContent(): string;
}
