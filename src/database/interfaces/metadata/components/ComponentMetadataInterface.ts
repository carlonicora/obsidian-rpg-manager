import {RelationshipMetadataInterface} from "../RelationshipMetadataInterface";
import {ComponentDataInterface} from "../../../components/interfaces/ComponentDataInterface";

export interface ComponentMetadataInterface {
	data?: ComponentDataInterface|any;
	relationships?: Array<RelationshipMetadataInterface> | undefined;
}
