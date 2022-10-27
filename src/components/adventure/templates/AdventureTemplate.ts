import {ControllerMetadataInterface} from "../../../api/controllerManager/interfaces/ControllerMetadataInterface";
import {AdventureMetadataInterface} from "../interfaces/AdventureMetadataInterface";
import {ComponentType} from "../../../core/enums/ComponentType";
import {CampaignSetting} from "../../campaign/enums/CampaignSetting";
import {
	AbstractComponentTemplate
} from "../../../api/templatesManager/abstracts/AbstractComponentTemplate";

export class AdventureTemplate extends AbstractComponentTemplate {
	protected generateDataCodeBlock(
	): string {
		const metadata: AdventureMetadataInterface = {
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
				complete: false,
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
					acts: {
						relationship: 'hierarchy'
					}
				}
			}
		};

		return this.generateRpgManagerCodeBlock(metadata);
	}

	public generateID(
	): string {
		return ComponentType.Adventure + '-' + CampaignSetting.Agnostic + '-' + this.campaignId + '/' + this.adventureId;
	}
}
