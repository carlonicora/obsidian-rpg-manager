import {ComponentDataMetadataInterface} from "./data/ComponentDataMetadataInterface";
import {ControllerMetadataRelationshipInterface} from "../controllers/ControllerMetadataRelationshipInterface";

export interface ComponentMetadataInterface {
	data?: ComponentDataMetadataInterface|any;
	relationships?: Array<ControllerMetadataRelationshipInterface> | undefined;
}
