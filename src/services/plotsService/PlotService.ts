import {PlotServiceInterface} from "./interfaces/PlotServiceInterface";
import {ServiceInterface} from "../../managers/servicesManager/interfaces/ServiceInterface";
import {AbtStage} from "./enums/AbtStage";
import {StoryCircleStage} from "./enums/StoryCircleStage";
import {RpgManagerApiInterface} from "../../api/interfaces/RpgManagerApiInterface";
import {PlotView} from "./views/PlotView";

export class PlotService implements PlotServiceInterface, ServiceInterface {
	constructor(
		protected api: RpgManagerApiInterface,
	) {
	}

	public getAbtStage(
		readableAbtStage: string,
	): AbtStage {
		readableAbtStage = readableAbtStage[0].toUpperCase() + readableAbtStage.substring(1).toLowerCase();
		return AbtStage[readableAbtStage as keyof typeof AbtStage];
	}

	public getReadableAbtStage(
		type: AbtStage,
	): string {
		return AbtStage[type].toString().toLowerCase();
	}

	public getReadableStoryCircleStage(
		type: StoryCircleStage,
	): string {
		return StoryCircleStage[type].toString().toLowerCase();
	}

	public getStoryCircleStage(
		readableStoryCircleStage: string,
	): StoryCircleStage {
		readableStoryCircleStage = readableStoryCircleStage[0].toUpperCase() + readableStoryCircleStage.substring(1).toLowerCase();
		return StoryCircleStage[readableStoryCircleStage as keyof typeof StoryCircleStage];
	}

	public getView(
	): PlotView {
		return new PlotView(this.api);
	}
}
