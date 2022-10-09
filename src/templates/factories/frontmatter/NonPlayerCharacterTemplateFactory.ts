import {AbstractComponentTemplateFactory} from "../../abstracts/AbstractComponentTemplateFactory";
import {ControllerMetadataInterface} from "../../../metadatas/controllers/ControllerMetadataInterface";
import {CharacterMetadataInterface} from "../../../metadatas/components/CharacterMetadataInterface";

export class NonPlayerCharacterTemplateFactory extends AbstractComponentTemplateFactory {
	public addFrontmatterData(
		frontmatter: any,
	): void {
		frontmatter.tags.push(this.settings.npcTag + '/' + this.campaignId);
	}

	protected generateDataCodeBlock(
	): string {
		const metadata: CharacterMetadataInterface = {
			data: {
				synopsis: '',
				image: '',
				death: '',
				dob: '',
				goals: '',
				pronoun: '',
				complete: false
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
					subplots: {},
					pcs: {
						relationship: "univocal",
					},
					npcs: {
						relationship: "univocal",
					},
					factions: {},
					locations: {},
					events: {},
					clues: {},
				}
			},
		}

		return this.generateRpgManagerCodeBlock(metadata);
	}
}

