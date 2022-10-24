import {ComponentDataMetadataInterface} from "./ComponentDataMetadataInterface";
import {ControllerMetadataRelationshipInterface} from "../controller/interfaces/ControllerMetadataRelationshipInterface";

export interface ComponentMetadataInterface {
	data?: ComponentDataMetadataInterface|any;
	relationships?: ControllerMetadataRelationshipInterface[] | undefined;
}
