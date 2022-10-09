import {AbstractComponentTemplateFactory} from "../../abstracts/AbstractComponentTemplateFactory";
import {ControllerMetadataInterface} from "../../../metadatas/controllers/ControllerMetadataInterface";
import {ActDataInterface} from "../../../databases/components/interfaces/data/ActDataInterface";
import {ActMetadataInterface} from "../../../metadatas/components/ActMetadataInterface";

export class ActTemplateFactory extends AbstractComponentTemplateFactory {
	public addFrontmatterData(
		frontmatter: any,
	): void {
		frontmatter.tags.push(this.settings.actTag + '/' + this.campaignId + '/' + this.adventureId + '/' + this.actId);
	}

	protected generateDataCodeBlock(
	): string {
		const metadata: ActMetadataInterface = {
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
				complete: false,
				abtStage: ''
			}
		};
		return this.generateRpgManagerDataCodeBlock(metadata);
	}

	public generateInitialCodeBlock(
	): string {
		const metadata: ControllerMetadataInterface = {
			models: {
				header: true
			},
		};

		return this.generateRpgManagerCodeBlock(metadata);
	}

	public generateLastCodeBlock(
	): string|undefined {
		const metadata: ControllerMetadataInterface = {
			models: {
				lists: {
					scenes: {
						relationship: 'hierarchy'
					},
					pcs: {
						relationship: 'univocal'
					},
					npcs: {
						relationship: 'univocal'
					},
					clues: {
						relationship: 'univocal'
					},
					locations: {
						relationship: 'univocal'
					},
					factions: {
						relationship: 'univocal'
					}
				}
			}
		}
		return this.generateRpgManagerCodeBlock(metadata);
	}
}
