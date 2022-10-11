import {CampaignDataMetadataInterface} from "./CampaignDataMetadataInterface";
import {ComponentMetadataInterface} from "../../../interfaces/ComponentMetadataInterface";
import {PlotsMetadataInterface} from "../../../../plots/interfaces/PlotsMetadataInterface";

export interface CampaignMetadataInterface extends ComponentMetadataInterface, PlotsMetadataInterface {
	data?: CampaignDataMetadataInterface|any;
}
