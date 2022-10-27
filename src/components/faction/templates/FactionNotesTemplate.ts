import {ComponentNotesInterface} from "../../../api/templatesManager/interfaces/ComponentNotesInterface";
import {AbstractComponentNoteTemplate} from "../../../api/templatesManager/abstracts/AbstractComponentNoteTemplate";

export class FactionNotesTemplate extends AbstractComponentNoteTemplate implements ComponentNotesInterface {
	public getContent(): string {
		return '---\n' +
			'### FactionModel Details\n' +
			' - \n\n' +
			'---\n';
	}
}
