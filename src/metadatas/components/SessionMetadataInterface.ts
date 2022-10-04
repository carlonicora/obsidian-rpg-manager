import {ComponentMetadataInterface} from "./ComponentMetadataInterface";
import {PlotsMetadataInterface} from "../plots/PlotsMetadataInterface";
import {SessionDataMetadataInterface} from "./data/SessionDataMetadataInterface";

export interface SessionMetadataInterface extends ComponentMetadataInterface, PlotsMetadataInterface{
	data?: SessionDataMetadataInterface;
}
