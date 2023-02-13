import {ComponentNotesInterface} from "../../../managers/templatesManager/interfaces/ComponentNotesInterface";
import {AbstractComponentNoteTemplate} from "../../../managers/templatesManager/abstracts/AbstractComponentNoteTemplate";
import i18next from "i18next";

export class NonPlayerCharacterNotesTemplate extends AbstractComponentNoteTemplate implements ComponentNotesInterface {
	public getContent(): string {
		return '---\n' +
			'### ' + i18next.t("nonplayercharacter_notes") + '\n' +
			' - \n\n' +
			'### ' + i18next.t("nonplayercharacter_backstory") + '\n' +
			' - \n\n' +
			'---\n';
	}
}
