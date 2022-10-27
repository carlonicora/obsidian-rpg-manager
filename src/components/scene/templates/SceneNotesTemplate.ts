import {ComponentNotesInterface} from "../../../api/templatesManager/interfaces/ComponentNotesInterface";
import {AbstractComponentNoteTemplate} from "../../../api/templatesManager/abstracts/AbstractComponentNoteTemplate";

export class SceneNotesTemplate extends AbstractComponentNoteTemplate implements ComponentNotesInterface {
	public getContent(): string {
		return '---\n' +
			'### SceneModel Notes\n' +
			' - \n\n' +
			'---\n';
	}
}
