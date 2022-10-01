import {AbtStage} from "../../../enums/AbtStage";
import {ComponentMetadataInterface} from "./ComponentMetadataInterface";

export interface SessionMetadataInterface extends ComponentMetadataInterface{
	irl?: string | undefined;
	abtStage?: AbtStage | undefined;
}
