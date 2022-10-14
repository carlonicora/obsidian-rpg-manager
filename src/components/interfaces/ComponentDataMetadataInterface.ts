import {ImageMetadataInterface} from "./ImageMetadataInterface";

export interface ComponentDataMetadataInterface {
	synopsis?: string | undefined;
	image?: string | undefined;
	complete?: boolean | undefined;
	images?: Array<ImageMetadataInterface>;
}
