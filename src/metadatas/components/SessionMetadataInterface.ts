import {ComponentMetadataInterface} from "./ComponentMetadataInterface";
import {PlotsMetadataInterface} from "../PlotsMetadataInterface";
import {SessionDataMetadataInterface} from "../data/SessionDataMetadataInterface";

export interface SessionMetadataInterface extends ComponentMetadataInterface, PlotsMetadataInterface{
	data?: SessionDataMetadataInterface;
}
