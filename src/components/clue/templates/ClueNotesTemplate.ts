import {ComponentNotesInterface} from "../../../managers/templatesManager/interfaces/ComponentNotesInterface";
import {AbstractComponentNoteTemplate} from "../../../managers/templatesManager/abstracts/AbstractComponentNoteTemplate";
import i18next from "i18next";

export class ClueNotesTemplate extends AbstractComponentNoteTemplate implements ComponentNotesInterface {
	public getContent(): string {
		return '---\n' +
			'### ' + i18next.t("clue", {count: 1}) + ' ' + i18next.t("note", {count: 2}) + '\n' +
			' - \n\n' +
			'---\n';
	}
}
