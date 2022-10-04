import {RelationshipMetadataInterface} from "../relationships/RelationshipMetadataInterface";
import {ComponentDataMetadataInterface} from "./data/ComponentDataMetadataInterface";

export interface ComponentMetadataInterface {
	data?: ComponentDataMetadataInterface|any;
	relationships?: Array<RelationshipMetadataInterface> | undefined;
}
