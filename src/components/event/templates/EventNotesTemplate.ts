import {ComponentNotesInterface} from "../../../api/templatesManager/interfaces/ComponentNotesInterface";
import {AbstractComponentNoteTemplate} from "../../../api/templatesManager/abstracts/AbstractComponentNoteTemplate";

export class EventNotesTemplate extends AbstractComponentNoteTemplate implements ComponentNotesInterface {
	public getContent(): string {
		return '---\n' +
			'### EventModel Details\n' +
			' - \n\n' +
			'---\n';
	}
}
