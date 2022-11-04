import {ComponentMetadataInterface} from "../../../core/interfaces/ComponentMetadataInterface";
import {PlotsMetadataInterface} from "../../../services/plotsService/interfaces/PlotsMetadataInterface";
import {SessionDataMetadataInterface} from "./SessionDataMetadataInterface";

export interface SessionMetadataInterface extends ComponentMetadataInterface, PlotsMetadataInterface{
	data?: SessionDataMetadataInterface;
}
