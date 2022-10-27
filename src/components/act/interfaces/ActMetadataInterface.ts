import {ActDataMetadataInterface} from "./ActDataMetadataInterface";
import {PlotsMetadataInterface} from "../../../services/plotsServices/oldInterfaces/PlotsMetadataInterface";
import {ComponentMetadataInterface} from "../../../core/interfaces/ComponentMetadataInterface";

export interface ActMetadataInterface extends ComponentMetadataInterface, PlotsMetadataInterface{
	data?: ActDataMetadataInterface;
}
