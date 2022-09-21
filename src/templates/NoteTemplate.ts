import {TemplateInterface} from "../interfaces/TemplateInterface";
import {AbstractTemplate} from "../abstracts/AbstractTemplate";
import {CharacterInterface} from "../interfaces/data/CharacterInterface";
import {DataType} from "../enums/DataType";

export class NoteTemplate extends AbstractTemplate implements TemplateInterface {
	protected type:DataType = DataType.Note;
	public getContent(): string {
		if (this.id === undefined) return '';

		const characters = this.database.readList<CharacterInterface>(DataType.Character, this.id);

		let possibleRecappers = '';
		(characters || []).forEach((character: CharacterInterface) => {
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
		(characters || []).forEach((character: CharacterInterface) => {
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
