import {ComponentNotesTemplateFactoryInterface} from "../../../interfaces/factories/ComponentNotesTemplateFactoryInterface";
import {AbstractTemplate} from "../../../abstracts/AbstractTemplate";
import {ComponentType} from "../../../enums/ComponentType";
import {CharacterV2Interface} from "../../../_dbV2/components/interfaces/CharacterV2Interface";

export class SessionNotesTemplateFactory extends AbstractTemplate implements ComponentNotesTemplateFactoryInterface {
	public getContent(): string {

		const characters = this.database.read<CharacterV2Interface>(
			(character: CharacterV2Interface) =>
			character.id.type === ComponentType.Character &&
			character.id.campaignId === this.campaignId
		);

		let possibleRecappers = '';
		(characters || []).forEach((character: CharacterV2Interface) => {
			possibleRecappers += character.file.path + '/';
		});
		possibleRecappers = possibleRecappers.substring(0, possibleRecappers.length-1);

		let response = '---\n## Session Notes\n\n' +
			'Recap: ' + possibleRecappers + '\n\n' +
			'## GM Notes\n' +
			'-\n\n' +
			'## Feedbacks\n';

			response += this.generateFeedback('GM');

			(characters || []).forEach((character: CharacterV2Interface) => {
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
