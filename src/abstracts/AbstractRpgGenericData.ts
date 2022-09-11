import {AbstractRpgData} from "./AbstractRpgData";
import {RpgGenericDataInterface} from "../interfaces/data/RpgGenericDataInterface";
import {CachedMetadata, TFile} from "obsidian";
import {DataType} from "../enums/DataType";
import {CampaignInterface} from "../interfaces/data/CampaignInterface";

export abstract class AbstractRpgGenericData extends AbstractRpgData implements RpgGenericDataInterface{
	public campaign: CampaignInterface;
	public isOutline: boolean;

	reload(file: TFile, metadata: CachedMetadata) {
		super.reload(file, metadata);
		if (this.type !== DataType.Campaign) {
			const campaign = this.app.plugins.getPlugin('rpg-manager').io.getCampaign(this.app.plugins.getPlugin('rpg-manager').tagManager.getId(DataType.Campaign, this.tag));
			if (campaign != null) this.campaign = campaign;
		}
	}
}
