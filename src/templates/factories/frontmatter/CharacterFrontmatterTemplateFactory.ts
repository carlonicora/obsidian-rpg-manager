import {AbstractComponentFrontmatterTemplateFactory} from "../../abstracts/AbstractComponentFrontmatterTemplateFactory";
import {ControllerMetadataInterface} from "../../../metadatas/controllers/ControllerMetadataInterface";
import {CharacterMetadataInterface} from "../../../metadatas/components/CharacterMetadataInterface";

export class CharacterFrontmatterTemplateFactory extends AbstractComponentFrontmatterTemplateFactory {
	public addFrontmatterData(
		frontmatter: any,
	): void {
		frontmatter.tags.push(this.settings.pcTag + '/' + this.campaignId);
	}

	public generateInitialCodeBlock(
	): string|undefined {
		const metadata: ControllerMetadataInterface|CharacterMetadataInterface = {
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
		return this.generateRpgManagerCodeBlock(
			metadata
		);
	}
}
