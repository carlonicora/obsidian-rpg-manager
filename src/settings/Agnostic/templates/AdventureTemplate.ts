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

	protected generateTemplate(
	): string {
		let response = this.getHeader('Plot');
		response += this.getAbtPlot();
		response += this.getNotes();
		response += this.getRpgManagerCodeblock('adventure');

		return response;
	}
}
