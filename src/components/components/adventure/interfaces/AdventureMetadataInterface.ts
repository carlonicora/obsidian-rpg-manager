import {PlotsMetadataInterface} from "../../../../plots/interfaces/PlotsMetadataInterface";
import {AdventureDataMetadataInterface} from "./AdventureDataMetadataInterface";
import {ComponentMetadataInterface} from "../../../interfaces/ComponentMetadataInterface";

export interface AdventureMetadataInterface extends PlotsMetadataInterface, ComponentMetadataInterface {
	data?: AdventureDataMetadataInterface;
}
