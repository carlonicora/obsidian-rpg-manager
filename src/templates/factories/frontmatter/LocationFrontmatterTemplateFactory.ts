import {AbstractComponentFrontmatterTemplateFactory} from "../../../abstracts/AbstractComponentFrontmatterTemplateFactory";
import {ControllerMetadataInterface} from "../../../metadatas/controllers/ControllerMetadataInterface";
import {LocationMetadataInterface} from "../../../metadatas/components/LocationMetadataInterface";

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
				header: true,
				lists: {
					pcs: {},
					npcs: {},
					events: {},
					clues: {},
					locations: [
						{
							relationship: "parent",
							title: "Inside"
						},
						{
							relationship: "child",
							title: "Other locations part of this"
						}
					],
				}
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
