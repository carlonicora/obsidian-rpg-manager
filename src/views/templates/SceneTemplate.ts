import {AbstractTemplate} from "../../abstracts/AbstractTemplate";
import {AbstractTemplateModal} from "../../abstracts/AbstractTemplateModal";

export class SceneTemplate extends AbstractTemplate {

	protected generateFrontmatterTags(
	): string {
		return 'tags: [' + this.settings.sceneTag + '/' + this.campaignId + '/' + this.adventureId + '/' + this.sessionId + '/' + this.sceneId + ']\n';
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

	protected generateTemplate(
	): string {
		let response = this.getRpgManagerCodeblock('sceneNavigation');
		response += this.getHeader('Trigger');
		response += '\n\n';
		response += this.getNotes();
		response += this.getRpgManagerCodeblock('scene');

		return response;
	}
}

