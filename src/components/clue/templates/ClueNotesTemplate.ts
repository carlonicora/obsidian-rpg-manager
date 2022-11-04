import {ComponentNotesInterface} from "../../../managers/templatesManager/interfaces/ComponentNotesInterface";
import {AbstractComponentNoteTemplate} from "../../../managers/templatesManager/abstracts/AbstractComponentNoteTemplate";

export class ClueNotesTemplate extends AbstractComponentNoteTemplate implements ComponentNotesInterface {
	public getContent(): string {
		return '---\n' +
			'### ClueModel Details\n' +
			' - \n\n' +
			'---\n';
	}
}
