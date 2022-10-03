import {ComponentMetadataInterface} from "./ComponentMetadataInterface";
import {PlotsMetadataInterface} from "../PlotsMetadataInterface";
import {SubplotDataMetadataInterface} from "../data/SubplotDataMetadataInterface";

export interface SubplotMetadataInterface extends ComponentMetadataInterface, PlotsMetadataInterface{
	data?: SubplotDataMetadataInterface;
}
