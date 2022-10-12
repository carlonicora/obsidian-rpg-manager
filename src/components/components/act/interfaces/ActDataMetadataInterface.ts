import {ComponentDataMetadataInterface} from "../../../interfaces/ComponentDataMetadataInterface";

export interface ActDataMetadataInterface extends ComponentDataMetadataInterface {
	abtStage?: 'need' | 'and' | 'but' | 'therefore' | string | undefined;
}
