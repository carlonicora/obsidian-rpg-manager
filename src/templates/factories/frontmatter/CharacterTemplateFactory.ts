import {AbstractComponentTemplateFactory} from "../../abstracts/AbstractComponentTemplateFactory";
import {ControllerMetadataInterface} from "../../../metadatas/controllers/ControllerMetadataInterface";
import {CharacterMetadataInterface} from "../../../metadatas/components/CharacterMetadataInterface";

export class CharacterTemplateFactory extends AbstractComponentTemplateFactory {
	public addFrontmatterData(
		frontmatter: any,
	): void {
		frontmatter.tags.push(this.settings.pcTag + '/' + this.campaignId);
	}

	protected generateDataCodeBlock(
	): string {
		const metadata: CharacterMetadataInterface = {
			data: {
				synopsis: '',
				image: '',
				complete: false,
				dob: '',
				death: '',
				goals: '',
				pronoun: ''
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
					pcs: {
						relationship: "univocal",
					},
					npcs: {
						relationship: "univocal",
					},
					factions: {},
					locations: {},
				}
			},
		};

		return this.generateRpgManagerCodeBlock(metadata);
	}
}
