import {AbstractTemplate} from "../../abstracts/AbstractTemplate";
import {AbstractTemplateModal} from "../../abstracts/AbstractTemplateModal";

export class LocationTemplate extends AbstractTemplate {
	protected generateFrontmatterTags(
	): string {
		return 'tags: [' + this.settings.locationTag + '/' + this.campaignId + ']\n';
	}

	protected generateFrontmatterSynopsis(
	): string {
		return 'synopsis: ""\n';
	}

	protected generateFrontmatterAddress(
	): string {
		return 'address: ""\n';
	}

	protected generateTemplate(
	): string {
		let response = this.getRpgManagerCodeblock('location');
		response += this.getAdditionalInformation();

		return response;
	}
}

export class LocationModal extends AbstractTemplateModal {
	protected content(
		contentEl: HTMLElement,
	): void {
		this.campaignBlock(contentEl);
	}
}

