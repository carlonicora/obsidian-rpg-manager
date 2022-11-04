import {ComponentNotesInterface} from "../../../managers/templatesManager/interfaces/ComponentNotesInterface";
import {AbstractComponentNoteTemplate} from "../../../managers/templatesManager/abstracts/AbstractComponentNoteTemplate";

export class CharacterNotesTemplate extends AbstractComponentNoteTemplate implements ComponentNotesInterface {
	public getContent(): string {
		return '---\n' +
			'### Player CharacterModel Notes\n' +
			' - \n\n' +
			'---\n';
	}
}
