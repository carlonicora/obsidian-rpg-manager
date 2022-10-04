import {ComponentMetadataInterface} from "./ComponentMetadataInterface";
import {PlotsMetadataInterface} from "../plots/PlotsMetadataInterface";
import {SubplotDataMetadataInterface} from "./data/SubplotDataMetadataInterface";

export interface SubplotMetadataInterface extends ComponentMetadataInterface, PlotsMetadataInterface{
	data?: SubplotDataMetadataInterface;
}
