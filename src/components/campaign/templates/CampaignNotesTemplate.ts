import {ComponentNotesInterface} from "../../../managers/templatesManager/interfaces/ComponentNotesInterface";
import {AbstractComponentNoteTemplate} from "../../../managers/templatesManager/abstracts/AbstractComponentNoteTemplate";

export class CampaignNotesTemplate extends AbstractComponentNoteTemplate implements ComponentNotesInterface {
	public getContent(): string {
		return '---\n' +
			'### CampaignModel Notes\n' +
			' - \n\n' +
			'---\n';
	}
}
