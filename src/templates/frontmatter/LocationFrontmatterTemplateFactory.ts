import {AbstractComponentFrontmatterTemplateFactory} from "../../abstracts/AbstractComponentFrontmatterTemplateFactory";
import {ControllerMetadataInterface} from "../../database/interfaces/metadata/ControllerMetadataInterface";
import {LocationMetadataInterface} from "../../database/interfaces/metadata/components/LocationMetadataInterface";

export class LocationFrontmatterTemplateFactory extends AbstractComponentFrontmatterTemplateFactory {
	public addFrontmatterData(
		frontmatter: any,
	): void {
		frontmatter.tags.push(this.settings.locationTag + '/' + this.campaignId);
	}

	public generateInitialCodeBlock(
	): string|undefined {
		const metadata: ControllerMetadataInterface|LocationMetadataInterface = {
			models: {
				header: true
			},
			data: {
				synopsis: '',
				image: '',
				complete: false,
				address: ''
			}
		};
		return this.generateRpgManagerCodeBlock(
			metadata
		);
	}
}
