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
		const additionalInformation = ' trigger: ""\n' +
			' action: ""\n';
		return this.getRpgManagerCodeblock('sceneNavigation', additionalInformation);
	}

	protected generateLastCodeBlock(): string {
		return this.getRpgManagerCodeblock('scene');
	}

	protected generateTemplate(
	): string {
		return this.getNotes();
	}
}

