import {AbstractComponentTemplateFactory} from "../../../../templates/abstracts/AbstractComponentTemplateFactory";
import {ControllerMetadataInterface} from "../../../../controller/interfaces/ControllerMetadataInterface";
import {CharacterMetadataInterface} from "../interfaces/CharacterMetadataInterface";
import {ComponentType} from "../../../enums/ComponentType";
import {CampaignSetting} from "../../campaign/enums/CampaignSetting";

export class NonPlayerCharacterTemplateFactory extends AbstractComponentTemplateFactory {
	protected generateDataCodeBlock(
	): string {
		const metadata: CharacterMetadataInterface = {
			data: {
				synopsis: '',
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

