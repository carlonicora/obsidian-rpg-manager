import {AbstractTemplate} from "../../../abstracts/AbstractTemplate";

export class EventTemplate extends AbstractTemplate {
	protected generateFrontmatterTags(
	): string {
		return 'tags: [' + this.app.plugins.getPlugin('rpg-manager').settings.eventTag + '/' + this.campaignId + ']\n';
	}

	protected generateFrontmatterSynopsis(
	): string {
		return 'synopsis: ""\n';
	}

	protected generateFrontmatterRelationships(
	): string|null {
		return ' characters: \n' +
			' clues: \n' +
			' locations: \n';
	}

	protected generateInitialCodeBlock(
	): string {
		return this.getRpgManagerCodeblock('event');
	}

	protected generateFrontmatterDates(
	): string|null {
		return ' event: \n';
	}

	protected generateTemplate(
	): string {
		const response = this.getAdditionalInformation();

		return response;
	}
}

