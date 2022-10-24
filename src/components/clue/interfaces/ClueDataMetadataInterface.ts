import {ComponentDataMetadataInterface} from "../../../core/interfaces/ComponentDataMetadataInterface";

export interface ClueDataMetadataInterface extends ComponentDataMetadataInterface {
	found?: string | boolean | undefined;
}
