import {ComponentNotesInterface} from "../../../api/templatesManager/interfaces/ComponentNotesInterface";
import {AbstractComponentNoteTemplate} from "../../../api/templatesManager/abstracts/AbstractComponentNoteTemplate";

export class LocationNotesTemplate extends AbstractComponentNoteTemplate implements ComponentNotesInterface {
	public getContent(): string {
		return '---\n' +
			'### LocationModel Details\n' +
			' - \n\n' +
			'---\n';
	}
}
