import {AbstractTemplate} from "../../../abstracts/AbstractTemplate";

export class FactionTemplate extends AbstractTemplate {
	protected generateFrontmatterTags(
	): string {
		return 'tags: [' + this.app.plugins.getPlugin('rpg-manager').settings.factionTag + '/' + this.campaignId + ']\n';
	}

	protected generateFrontmatterSynopsis(
	): string {
		return 'synopsis: ""\n';
	}

	protected generateFrontmatterRelationships(
	): string|null {
		return ' locations: \n';
	}

	protected generateInitialCodeBlock(
	): string {
		return this.getRpgManagerCodeblock('faction');
	}

	protected generateTemplate(
	): string {
		const response = this.getAdditionalInformation();

		return response;
	}
}
