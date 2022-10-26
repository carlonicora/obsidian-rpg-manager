import {ComponentDataMetadataInterface} from "./ComponentDataMetadataInterface";
import {ControllerMetadataRelationshipInterface} from "../../api/controllerManager/interfaces/ControllerMetadataRelationshipInterface";

export interface ComponentMetadataInterface {
	data?: ComponentDataMetadataInterface|any;
	relationships?: ControllerMetadataRelationshipInterface[] | undefined;
}
