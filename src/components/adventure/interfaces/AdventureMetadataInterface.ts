import {PlotsMetadataInterface} from "../../../services/plots/interfaces/PlotsMetadataInterface";
import {AdventureDataMetadataInterface} from "./AdventureDataMetadataInterface";
import {ComponentMetadataInterface} from "../../../core/interfaces/ComponentMetadataInterface";

export interface AdventureMetadataInterface extends PlotsMetadataInterface, ComponentMetadataInterface {
	data?: AdventureDataMetadataInterface;
}
