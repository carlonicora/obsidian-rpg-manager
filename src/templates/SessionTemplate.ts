import {TemplateInterface} from "../interfaces/TemplateInterface";
import {AbstractTemplate} from "../abstracts/AbstractTemplate";
import {CharacterInterface} from "../interfaces/data/CharacterInterface";
import {RecordType} from "../enums/RecordType";

export class SessionTemplate extends AbstractTemplate implements TemplateInterface {
	public getContent(): string {

		const characters = this.database.read<CharacterInterface>(
			(character: CharacterInterface) =>
			character.id.type === RecordType.Character &&
			character.id.campaignId === this.campaignId
		);

		let possibleRecappers = '';
		(characters || []).forEach((character: CharacterInterface) => {
			possibleRecappers += character.link + '/';
		});
		possibleRecappers = possibleRecappers.substring(0, possibleRecappers.length-1);

		let response = `## Session Notes
		
		---
		
		Recap: ` + possibleRecappers + `
		
		---
		
		## GM Notes
		- 
		
		---
		## Feedbacks
		` + this.generateFeedback('GM');
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
