import {ComponentDataMetadataInterface} from "../../../core/interfaces/ComponentDataMetadataInterface";

export interface ActDataMetadataInterface extends ComponentDataMetadataInterface {
	abtStage?: 'need' | 'and' | 'but' | 'therefore' | string | undefined;
}
