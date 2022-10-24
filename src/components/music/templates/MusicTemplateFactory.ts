import {AbstractComponentTemplateFactory} from "../../../core/abstracts/AbstractComponentTemplateFactory";
import {ControllerMetadataInterface} from "../../../core/controller/interfaces/ControllerMetadataInterface";
import {MusicMetadataInterface} from "../interfaces/MusicMetadataInterface";
import {ComponentType} from "../../../core/enums/ComponentType";
import {CampaignSetting} from "../../campaign/enums/CampaignSetting";

export class MusicTemplateFactory extends AbstractComponentTemplateFactory {
	protected generateDataCodeBlock(
	): string {
		const metadata: MusicMetadataInterface = {
			data: {
				synopsis: '',
				complete: false,
				url: ''
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
					musics: [
						{
							relationship: "parent",
							title: "Part of playlists"
						},
						{
							relationship: "child",
							title: "Songs",
						}
					]
				}
			},
		};

		return this.generateRpgManagerCodeBlock(metadata);
	}

	public generateID(
	): string {
		return ComponentType.Music + '-' + CampaignSetting.Agnostic + '-' + this.campaignId;
	}
}
