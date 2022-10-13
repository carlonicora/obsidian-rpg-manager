import {ComponentNotesTemplateFactoryInterface} from "../../../../templates/factories/interfaces/ComponentNotesTemplateFactoryInterface";
import {AbstractTemplate} from "../../../../templates/abstracts/AbstractTemplate";
import {ComponentType} from "../../../enums/ComponentType";
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
			'### Session Notes\n\n' +
			'Previous Session Recap: ' + possibleRecappers + '\n\n' +
			'### Storyteller Diary\n' +
			'-\n\n' +
			'### End of Session Feedbacks\n';

			response += this.generateFeedback('Storyteller');

			(characters || []).forEach((character: CharacterInterface) => {
				response += this.generateFeedback(character.link);
			});

			response += '---\n';

		return response;
	}

	private generateFeedback(
		characterName: string,
	): string {
		return characterName + '\n' +
			'- **Notes**: \n' +
			'- **Wish**: \n' +
			'- **Rose**: \n\n';
	}
}
