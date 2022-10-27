import {ControllerMetadataInterface} from "../../../managers/controllerManager/interfaces/ControllerMetadataInterface";
import {CharacterMetadataInterface} from "../interfaces/CharacterMetadataInterface";
import {ComponentType} from "../../../core/enums/ComponentType";
import {CampaignSetting} from "../../campaign/enums/CampaignSetting";
import {
	AbstractComponentTemplate
} from "../../../managers/templatesManager/abstracts/AbstractComponentTemplate";

export class NonPlayerCharacterTemplate extends AbstractComponentTemplate {
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
		};

		return this.generateRpgManagerCodeBlock(metadata);
	}

	public generateID(
	): string {
		return ComponentType.NonPlayerCharacter + '-' + CampaignSetting.Agnostic + '-' + this.campaignId;
	}
}

