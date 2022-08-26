import {AbstractTemplate} from "../../abstracts/AbstractTemplate";
import {AbstractTemplateModal} from "../../abstracts/AbstractTemplateModal";

export class AdventureTemplate extends AbstractTemplate {
	protected generateFrontmatterTags(
	): string {
		return 'tags: [' + this.settings.adventureTag + '/' + this.campaignId + '/' + this.adventureId + ']\n';
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
