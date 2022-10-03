import {ComponentNotesTemplateFactoryInterface} from "../../interfaces/factories/ComponentNotesTemplateFactoryInterface";
import {AbstractTemplate} from "../../abstracts/AbstractTemplate";
import {ComponentType} from "../../enums/ComponentType";
import {CharacterInterface} from "../../database/components/interfaces/CharacterInterface";

export class SessionNotesTemplateFactory extends AbstractTemplate implements ComponentNotesTemplateFactoryInterface {
	public getContent(): string {

		const characters = this.database.read<CharacterInterface>(
			(character: CharacterInterface) =>
			character.id.type === ComponentType.Character &&
			character.id.campaignId === this.campaignId
		);

		let possibleRecappers = '';
		(characters || []).forEach((character: CharacterInterface) => {
			possibleRecappers += character.file.path + '/';
		});
		possibleRecappers = possibleRecappers.substring(0, possibleRecappers.length-1);

		let response = '---\n## Session Notes\n\n' +
			'Recap: ' + possibleRecappers + '\n\n' +
			'## GM Notes\n' +
			'-\n\n' +
			'## Feedbacks\n';

			response += this.generateFeedback('GM');

			(characters || []).forEach((character: CharacterInterface) => {
				response += this.generateFeedback(character.file.path);
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
