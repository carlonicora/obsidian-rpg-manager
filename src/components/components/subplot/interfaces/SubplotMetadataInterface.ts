import {ComponentMetadataInterface} from "../../../interfaces/ComponentMetadataInterface";
import {PlotsMetadataInterface} from "../../../../plots/interfaces/PlotsMetadataInterface";
import {SubplotDataMetadataInterface} from "./SubplotDataMetadataInterface";

export interface SubplotMetadataInterface extends ComponentMetadataInterface, PlotsMetadataInterface{
	data?: SubplotDataMetadataInterface;
}
