import {CampaignInterface} from "./interfaces/CampaignInterface";
import {ComponentStage} from "./enums/ComponentStage";
import {CampaignMetadataInterface} from "../../metadatas/components/CampaignMetadataInterface";
import {AbstractCampaignData} from "./abstracts/data/AbstractCampaignData";

export class Campaign extends AbstractCampaignData implements CampaignInterface {
	protected metadata: CampaignMetadataInterface;
	public stage: ComponentStage = ComponentStage.Plot;

	public get folder(
	): string {
		const lastSlashPosition = this.file.path.lastIndexOf('/');
		return (lastSlashPosition !== -1 ? this.file.path.substring(0, lastSlashPosition + 1) : '/');
	}
}
