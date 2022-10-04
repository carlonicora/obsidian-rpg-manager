import {AbtStage} from "../../enums/AbtStage";

export interface AbtStageFactoryInterface {
	createAbtStage(
		readableAbtStage: string,
	): AbtStage;

	createReadableAbtStage(
		type: AbtStage,
	): string;
}
