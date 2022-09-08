import {AbstractTemplate} from "../../../abstracts/AbstractTemplate";

export class SceneTemplate extends AbstractTemplate {

	protected generateFrontmatterTags(
	): string {
		return 'tags: [' + this.app.plugins.getPlugin('rpg-manager').settings.sceneTag + '/' + this.campaignId + '/' + this.adventureId + '/' + this.sessionId + '/' + this.sceneId + ']\n';
	}

	protected generateFrontmatterSynopsis(
	): string {
		return 'synopsis: ""\n';
	}

	protected generateFrontmatterAction(
	): string {
		return 'action: ""\n';
	}

	protected generateFrontmatterRelationships(
	): string|null {
		return ' clues: \n' +
			' characters: \n' +
			' locations: \n';
	}

	protected generateFrontmatterTimes(
	): string|null {
		return ' start: \n' +
			' end: \n';
	}

	protected generateInitialCodeBlock(
	): string {
		let additionalInformation = ' trigger: \n' +
			' action: \n';
		return this.getRpgManagerCodeblock('sceneNavigation', additionalInformation);
	}

	protected generateLastCodeBlock(): string {
		return this.getRpgManagerCodeblock('scene');
	}

	protected generateTemplate(
	): string {
		let response = this.getHeader('Trigger');
		response += '\n\n';
		response += this.getNotes();

		return response;
	}
}

