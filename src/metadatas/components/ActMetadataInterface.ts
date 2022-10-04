import {ActDataMetadataInterface} from "./data/ActDataMetadataInterface";
import {PlotsMetadataInterface} from "../plots/PlotsMetadataInterface";
import {ComponentMetadataInterface} from "./ComponentMetadataInterface";

export interface ActMetadataInterface extends ComponentMetadataInterface, PlotsMetadataInterface{
	data?: ActDataMetadataInterface;
}
