import {AbstractComponentFrontmatterTemplateFactory} from "../../../abstracts/AbstractComponentFrontmatterTemplateFactory";
import {ControllerMetadataInterface} from "../../../metadatas/controllers/ControllerMetadataInterface";
import {SubplotMetadataInterface} from "../../../metadatas/components/SubplotMetadataInterface";

export class SubplotFrontmatterTemplateFactory extends AbstractComponentFrontmatterTemplateFactory {
	public addFrontmatterData(
		frontmatter: any,
	): void {
		frontmatter.tags.push(this.settings.subplotTag + '/' + this.campaignId);
	}

	public generateInitialCodeBlock(
	): string|undefined {
		const metadata: ControllerMetadataInterface|SubplotMetadataInterface = {
			models: {
				header: true,
				lists: {
					events: {},
					clues: {},
					factions: {
						relationship: "univocal"
					},
					npcs: {
						relationship: "univocal"
					},
				}
			},
			plot: {
				abt: {
					need: '',
					and: '',
					but: '',
					therefore: '',
				},
				storycircle: {
					you: '',
					need: '',
					go: '',
					search: '',
					find: '',
					take: '',
					return: '',
					change: '',
				}
			},
			data: {
				synopsis: '',
				image: '',
				complete: false
			}
		};
		return this.generateRpgManagerCodeBlock(
			metadata
		);
	}
}
