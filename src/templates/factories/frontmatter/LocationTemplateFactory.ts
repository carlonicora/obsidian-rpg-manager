import {AbstractComponentTemplateFactory} from "../../abstracts/AbstractComponentTemplateFactory";
import {ControllerMetadataInterface} from "../../../metadatas/controllers/ControllerMetadataInterface";
import {LocationMetadataInterface} from "../../../metadatas/components/LocationMetadataInterface";
import {ComponentType} from "../../../databases/enums/ComponentType";
import {CampaignSetting} from "../../../databases/enums/CampaignSetting";

export class LocationTemplateFactory extends AbstractComponentTemplateFactory {
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

	public generateID(
	): string {
		return ComponentType.Location + '-' + CampaignSetting.Agnostic + '-' + this.campaignId;
	}
}
