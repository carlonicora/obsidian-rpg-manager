import {AbstractTemplate} from "../../../abstracts/AbstractTemplate";
import {CharacterInterface} from "../../../interfaces/data/CharacterInterface";

export class NoteTemplate extends AbstractTemplate {
	protected generateFrontmatterTags(): string {
		return 'tags: [' + this.app.plugins.getPlugin('rpg-manager').settings.noteTag + '/' + this.campaignId + '/' + this.adventureId + '/' + this.sessionId +']\n';
	}

	protected generateInitialCodeBlock(
	): string {
		return this.getRpgManagerCodeblock('note');
	}

	protected generateTemplate(): string {
		const characters = this.app.plugins.getPlugin('rpg-manager').io.getPlayerCharacterList(this.campaignId);

		let response = '---\n';
		response += this.getHeader('GM Notes');
		response += '- \n\n';
		response += '---\n';
		response += this.getHeader('Feedback');
		response += '\n';
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
