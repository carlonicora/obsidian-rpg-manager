import {TemplateInterface} from "../interfaces/TemplateInterface";
import {AbstractTemplate} from "../abstracts/AbstractTemplate";
import {CharacterInterface} from "../interfaces/data/CharacterInterface";

export class NoteTemplate extends AbstractTemplate implements TemplateInterface {
	public getContent(): string {
		const characters = this.app.plugins.getPlugin('rpg-manager').io.getPlayerCharacterList(this.campaignId);

		let possibleRecappers = '';
		(characters.elements || []).forEach((character: CharacterInterface) => {
			possibleRecappers += character.link + '/';
		});
		possibleRecappers = possibleRecappers.substring(0, possibleRecappers.length-1);

		let response = '---\n';
		response += 'Recap: ' + possibleRecappers + '\n\n';
		response += '---\n';
		response += '## GM Notes\n- \n\n';
		response += '---\n';
		response += '## Feedback \n';
		response += this.generateFeedback('GM');
		(characters.elements || []).forEach((character: CharacterInterface) => {
			response += this.generateFeedback(character.link);
		});

		return response;
	}

	private generateFeedback(
		characterName: string,
	): string {
		return '**' + characterName + '**\n' +
			'- **Notes**: \n' +
			'- **Wish**: \n' +
			'- **Rose**: \n\n';
	}
}
