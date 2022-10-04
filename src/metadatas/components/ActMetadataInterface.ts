import {ActDataMetadataInterface} from "../data/ActDataMetadataInterface";
import {PlotsMetadataInterface} from "../PlotsMetadataInterface";
import {ComponentMetadataInterface} from "./ComponentMetadataInterface";

export interface ActMetadataInterface extends ComponentMetadataInterface, PlotsMetadataInterface{
	data?: ActDataMetadataInterface;
}
