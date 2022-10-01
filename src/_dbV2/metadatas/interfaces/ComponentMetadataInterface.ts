import {RelationshipV2Interface} from "../../relationships/interfaces/RelationshipV2Interface";

export interface ComponentMetadataInterface {
	synopsis?: string | undefined;
	image?: string | undefined;
	relationships?: Array<RelationshipV2Interface> | undefined;
}
