import {AbstractTemplate} from "../../../abstracts/AbstractTemplate";

export class LocationTemplate extends AbstractTemplate {
	protected generateFrontmatterTags(
	): string {
		return 'tags: [' + this.app.plugins.getPlugin('rpg-manager').settings.locationTag + '/' + this.campaignId + ']\n';
	}

	protected generateFrontmatterSynopsis(
	): string {
		return 'synopsis: ""\n';
	}

	protected generateFrontmatterAdditionalInformation(
	): string {
		return 'address: ""\n';
	}

	protected generateInitialCodeBlock(
	): string {
		return this.getRpgManagerCodeblock('location');
	}

	protected generateTemplate(
	): string {
		const response = this.getAdditionalInformation();

		return response;
	}

	protected generateFrontmatterRelationships(
	): string|null {
		return ' locations: \n';
	}
}
