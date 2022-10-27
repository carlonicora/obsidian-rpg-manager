import {ComponentMetadataInterface} from "../../../core/interfaces/ComponentMetadataInterface";
import {PlotsMetadataInterface} from "../../../services/plotsServices/oldInterfaces/PlotsMetadataInterface";
import {SubplotDataMetadataInterface} from "./SubplotDataMetadataInterface";

export interface SubplotMetadataInterface extends ComponentMetadataInterface, PlotsMetadataInterface{
	data?: SubplotDataMetadataInterface;
}
