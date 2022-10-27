import {CampaignDataMetadataInterface} from "./CampaignDataMetadataInterface";
import {ComponentMetadataInterface} from "../../../core/interfaces/ComponentMetadataInterface";
import {PlotsMetadataInterface} from "../../../services/plotsServices/interfaces/PlotsMetadataInterface";

export interface CampaignMetadataInterface extends ComponentMetadataInterface, PlotsMetadataInterface {
	data?: CampaignDataMetadataInterface|any;
}
