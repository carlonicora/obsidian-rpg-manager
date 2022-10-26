import {CampaignInterface} from "../interfaces/CampaignInterface";
import {ComponentStage} from "../../../core/enums/ComponentStage";
import {CampaignMetadataInterface} from "../interfaces/CampaignMetadataInterface";
import {AbstractCampaignData} from "../abstracts/AbstractCampaignData";

export class CampaignModel extends AbstractCampaignData implements CampaignInterface {
	protected metadata: CampaignMetadataInterface;
	public stage: ComponentStage = ComponentStage.Plot;

	public get folder(
	): string {
		const lastSlashPosition = this.file.path.lastIndexOf('/');

		return (lastSlashPosition !== -1 ? this.file.path.substring(0, lastSlashPosition + 1) : '/');
	}
}
