import {AbstractComponentTemplateFactory} from "../../abstracts/AbstractComponentTemplateFactory";
import {ControllerMetadataInterface} from "../../../metadatas/controllers/ControllerMetadataInterface";
import {LocationMetadataInterface} from "../../../metadatas/components/LocationMetadataInterface";

export class LocationTemplateFactory extends AbstractComponentTemplateFactory {
	public addFrontmatterData(
		frontmatter: any,
	): void {
		frontmatter.tags.push(this.settings.locationTag + '/' + this.campaignId);
	}

	protected generateDataCodeBlock(
	): string {
		const metadata: LocationMetadataInterface = {
			data: {
				synopsis: '',
				image: '',
				complete: false,
				address: ''
			}
		};
		return this.generateRpgManagerDataCodeBlock(metadata);
	}

	public generateInitialCodeBlock(
	): string {
		const metadata: ControllerMetadataInterface = {
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
							title: "Contains"
						}
					],
				}
			},
		};

		return this.generateRpgManagerCodeBlock(metadata);
	}
}
