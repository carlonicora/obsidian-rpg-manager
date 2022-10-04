import {PlotsMetadataInterface} from "../plots/PlotsMetadataInterface";
import {AdventureDataMetadataInterface} from "./data/AdventureDataMetadataInterface";
import {ComponentMetadataInterface} from "./ComponentMetadataInterface";

export interface AdventureMetadataInterface extends PlotsMetadataInterface, ComponentMetadataInterface {
	data?: AdventureDataMetadataInterface;
}
