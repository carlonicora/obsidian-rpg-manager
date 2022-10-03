import {AbtPlotMetadataInterface} from "../AbtPlotMetadataInterface";
import {CampaignDataMetadataInterface} from "../data/CampaignDataMetadataInterface";
import {ComponentMetadataInterface} from "./ComponentMetadataInterface";

export interface CampaignMetadataInterface extends ComponentMetadataInterface, AbtPlotMetadataInterface {
	data?: CampaignDataMetadataInterface|any;
}
