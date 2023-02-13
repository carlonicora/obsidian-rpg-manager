import {ComponentType} from "../../../core/enums/ComponentType";
import {CharacterInterface} from "../../character/interfaces/CharacterInterface";
import {ComponentNotesInterface} from "../../../managers/templatesManager/interfaces/ComponentNotesInterface";
import {AbstractComponentNoteTemplate} from "../../../managers/templatesManager/abstracts/AbstractComponentNoteTemplate";
import i18next from "i18next";

export class SessionNotesTemplate extends AbstractComponentNoteTemplate implements ComponentNotesInterface {
	public getContent(): string {

		const characters = this.api.database.read<CharacterInterface>(
			(character: CharacterInterface) =>
			character.index.type === ComponentType.Character &&
			character.index.campaignId === this.campaignId
		);

		let possibleRecappers = '';
		(characters || []).forEach((character: CharacterInterface) => {
			possibleRecappers += character.link + '/';
		});

		possibleRecappers = possibleRecappers.substring(0, possibleRecappers.length-1);
		let response = '---\n' +
			'### ' + i18next.t("session_notes") + '\n\n' +
			i18next.t("session_recap") + ": " + possibleRecappers + '\n\n' +
			'### ' + i18next.t("storyteller_notes") + '\n' +
			'-\n\n' +
			'### ' + i18next.t("session_feedback") + '\n';
		response += this._generateFeedback(i18next.t("storyteller"));

		(characters || []).forEach((character: CharacterInterface) => {
			response += this._generateFeedback(character.link);
		});
		response += '---\n';
		return response;
	}

	private _generateFeedback(
		characterName: string,
	): string {
		return characterName + '\n' +
			'- **' + i18next.t("note", {count: 2}) + '**: \n' +
			'- **' + i18next.t("wish") + '**: \n' +
			'- **' + i18next.t("rose") + '**: \n\n';
	}
}
