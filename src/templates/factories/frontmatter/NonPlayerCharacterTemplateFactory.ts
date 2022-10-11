import {AbstractComponentTemplateFactory} from "../../abstracts/AbstractComponentTemplateFactory";
import {ControllerMetadataInterface} from "../../../metadatas/controllers/ControllerMetadataInterface";
import {CharacterMetadataInterface} from "../../../metadatas/components/CharacterMetadataInterface";
import {ComponentType} from "../../../databases/enums/ComponentType";
import {CampaignSetting} from "../../../databases/enums/CampaignSetting";

export class NonPlayerCharacterTemplateFactory extends AbstractComponentTemplateFactory {
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
						relationship: "unidirectional",
					},
					npcs: {
						relationship: "unidirectional",
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

	public generateID(
	): string {
		return ComponentType.NonPlayerCharacter + '-' + CampaignSetting.Agnostic + '-' + this.campaignId;
	}
}

