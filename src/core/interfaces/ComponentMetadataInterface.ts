import {ComponentDataMetadataInterface} from "./ComponentDataMetadataInterface";
import {ControllerMetadataRelationshipInterface} from "../../managers/controllerManager/interfaces/ControllerMetadataRelationshipInterface";

export interface ComponentMetadataInterface {
	data?: ComponentDataMetadataInterface|any;
	relationships?: ControllerMetadataRelationshipInterface[] | undefined;
}
