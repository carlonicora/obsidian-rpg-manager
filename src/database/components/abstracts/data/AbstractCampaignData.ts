import {CampaignDataInterface} from "../../interfaces/data/CampaignDataInterface";
import {CampaignMetadataInterface} from "../../../interfaces/metadata/components/CampaignMetadataInterface";
import {PlotsAbtOnly} from "../../../plots/PlotsAbtOnly";

export abstract class AbstractCampaignData extends PlotsAbtOnly implements CampaignDataInterface{
	protected metadata: CampaignMetadataInterface;

	public get date(): Date|undefined {
		return (this.metadata.data?.date ? new Date(this.metadata.data.date) : undefined);
	}
}
