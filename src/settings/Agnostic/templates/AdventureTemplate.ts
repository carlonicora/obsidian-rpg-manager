import {AbstractTemplate} from "../../../abstracts/AbstractTemplate";

export class AdventureTemplate extends AbstractTemplate {
	protected generateFrontmatterTags(
	): string {
		return 'tags: [' + this.app.plugins.getPlugin('rpg-manager').settings.adventureTag + '/' + this.campaignId + '/' + this.adventureId + ']\n';
	}

	protected generateFrontmatterSynopsis(
	): string {
		return 'synopsis: ""\n';
	}

	protected generateInitialCodeBlock(
	): string {
		const additionalInformation = ' abt: \n' +
			'  need: \n' +
			'  and: \n' +
			'  but: \n' +
			'  therefore: \n';
		return this.getRpgManagerCodeblock('adventureNavigation', additionalInformation);
	}

	protected generateLastCodeBlock(): string {

		return this.getRpgManagerCodeblock('adventure');
	}

	protected generateTemplate(
	): string {
		return this.getNotes();
	}
}
