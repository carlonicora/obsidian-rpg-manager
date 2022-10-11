import {ComponentMetadataInterface} from "../../../interfaces/ComponentMetadataInterface";
import {PlotsMetadataInterface} from "../../../../plots/interfaces/PlotsMetadataInterface";
import {SessionDataMetadataInterface} from "./SessionDataMetadataInterface";

export interface SessionMetadataInterface extends ComponentMetadataInterface, PlotsMetadataInterface{
	data?: SessionDataMetadataInterface;
}
