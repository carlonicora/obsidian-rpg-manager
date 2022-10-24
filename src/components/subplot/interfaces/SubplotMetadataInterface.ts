import {ComponentMetadataInterface} from "../../../core/interfaces/ComponentMetadataInterface";
import {PlotsMetadataInterface} from "../../../services/plots/interfaces/PlotsMetadataInterface";
import {SubplotDataMetadataInterface} from "./SubplotDataMetadataInterface";

export interface SubplotMetadataInterface extends ComponentMetadataInterface, PlotsMetadataInterface{
	data?: SubplotDataMetadataInterface;
}
