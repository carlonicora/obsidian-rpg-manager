import {PlotServiceInterface} from "./interfaces/PlotServiceInterface";
import {ServiceInterface} from "../../managers/servicesManager/interfaces/ServiceInterface";
import {AbtStage} from "./enums/AbtStage";
import {StoryCircleStage} from "./enums/StoryCircleStage";
import {RpgManagerApiInterface} from "../../api/interfaces/RpgManagerApiInterface";

export class PlotService implements PlotServiceInterface, ServiceInterface {
	constructor(
		protected api: RpgManagerApiInterface,
	) {
	}

	getAbtStage(
		readableAbtStage: string,
	): AbtStage {
		readableAbtStage = readableAbtStage[0].toUpperCase() + readableAbtStage.substring(1).toLowerCase();
		return AbtStage[readableAbtStage as keyof typeof AbtStage];
	}

	getReadableAbtStage(
		type: AbtStage,
	): string {
		return AbtStage[type].toString().toLowerCase();
	}

	getReadableStoryCircleStage(
		type: StoryCircleStage,
	): string {
		return StoryCircleStage[type].toString().toLowerCase();
	}

	getStoryCircleStage(
		readableStoryCircleStage: string,
	): StoryCircleStage {
		readableStoryCircleStage = readableStoryCircleStage[0].toUpperCase() + readableStoryCircleStage.substring(1).toLowerCase();
		return StoryCircleStage[readableStoryCircleStage as keyof typeof StoryCircleStage];
	}
}
