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
		return this.getRpgManagerCodeblock('adventureNavigation');
	}

	protected generateLastCodeBlock(): string {
		const additionalInformation = ' abt: \n' +
			'  need: \n' +
			'  and: \n' +
			'  but: \n' +
			'  therefore: \n';
		return this.getRpgManagerCodeblock('adventure', additionalInformation);
	}

	protected generateTemplate(
	): string {
		return this.getNotes();
	}
}
