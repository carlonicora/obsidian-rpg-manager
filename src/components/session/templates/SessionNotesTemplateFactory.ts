import {ComponentNotesTemplateFactoryInterface} from "../../../core/interfaces/ComponentNotesTemplateFactoryInterface";
import {AbstractTemplate} from "../../../core/abstracts/AbstractTemplate";
import {ComponentType} from "../../../core/enums/ComponentType";
import {CharacterInterface} from "../../character/interfaces/CharacterInterface";

export class SessionNotesTemplateFactory extends AbstractTemplate implements ComponentNotesTemplateFactoryInterface {
	public getContent(): string {

		const characters = this.database.read<CharacterInterface>(
			(character: CharacterInterface) =>
			character.id.type === ComponentType.Character &&
			character.id.campaignId === this.campaignId
		);

		let possibleRecappers = '';
		(characters || []).forEach((character: CharacterInterface) => {
			possibleRecappers += character.link + '/';
		});
		possibleRecappers = possibleRecappers.substring(0, possibleRecappers.length-1);

		let response = '---\n' +
			'### SessionModel Notes\n\n' +
			'Previous SessionModel Recap: ' + possibleRecappers + '\n\n' +
			'### Storyteller Diary\n' +
			'-\n\n' +
			'### End of SessionModel Feedbacks\n';

			response += this._generateFeedback('Storyteller');

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
			'- **Notes**: \n' +
			'- **Wish**: \n' +
			'- **Rose**: \n\n';
	}
}
