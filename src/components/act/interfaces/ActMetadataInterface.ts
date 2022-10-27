import {ActDataMetadataInterface} from "./ActDataMetadataInterface";
import {PlotsMetadataInterface} from "../../../services/plotsServices/interfaces/PlotsMetadataInterface";
import {ComponentMetadataInterface} from "../../../core/interfaces/ComponentMetadataInterface";

export interface ActMetadataInterface extends ComponentMetadataInterface, PlotsMetadataInterface{
	data?: ActDataMetadataInterface;
}
