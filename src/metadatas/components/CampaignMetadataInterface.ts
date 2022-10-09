import {AbtPlotMetadataInterface} from "../plots/AbtPlotMetadataInterface";
import {CampaignDataMetadataInterface} from "./data/CampaignDataMetadataInterface";
import {ComponentMetadataInterface} from "./ComponentMetadataInterface";
import {PlotsMetadataInterface} from "../plots/PlotsMetadataInterface";

export interface CampaignMetadataInterface extends ComponentMetadataInterface, PlotsMetadataInterface {
	data?: CampaignDataMetadataInterface|any;
}
