import {ActDataMetadataInterface} from "./ActDataMetadataInterface";
import {PlotsMetadataInterface} from "../../../../plots/interfaces/PlotsMetadataInterface";
import {ComponentMetadataInterface} from "../../../interfaces/ComponentMetadataInterface";

export interface ActMetadataInterface extends ComponentMetadataInterface, PlotsMetadataInterface{
	data?: ActDataMetadataInterface;
}
