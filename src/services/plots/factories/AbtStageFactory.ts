import {AbstractFactory} from "../../../core/abstracts/AbstractFactory";
import {AbtStageFactoryInterface} from "./interfaces/AbtStageFactoryInterface";
import {AbtStage} from "../enums/AbtStage";

export class AbtStageFactory extends AbstractFactory implements AbtStageFactoryInterface {
	createAbtStage(
		readableAbtStage: string,
	): AbtStage {
		readableAbtStage = readableAbtStage[0].toUpperCase() + readableAbtStage.substring(1).toLowerCase();
		return AbtStage[readableAbtStage as keyof typeof AbtStage];
	}

	createReadableAbtStage(
		type: AbtStage,
	): string {
		return AbtStage[type].toString().toLowerCase();
	}
}
