import {ComponentNotesInterface} from "../../../api/templatesManager/interfaces/ComponentNotesInterface";
import {AbstractComponentNoteTemplate} from "../../../api/templatesManager/abstracts/AbstractComponentNoteTemplate";

export class NonPlayerCharacterNotesTemplate extends AbstractComponentNoteTemplate implements ComponentNotesInterface {
	public getContent(): string {
		return '---\n' +
			'### Non Player CharacterModel Notes\n' +
			' - \n\n' +
			'### Non Player CharacterModel Story\n' +
			' - \n\n' +
			'---\n';
	}
}
