import {AbstractModel} from "../../../managers/modelsManager/abstracts/AbstractModel";
import {SceneDataInterface} from "../interfaces/SceneDataInterface";
import {SceneMetadataInterface} from "../interfaces/SceneMetadataInterface";
import {StoryCircleStage} from "../../../services/plotsService/enums/StoryCircleStage";
import {DateInterface} from "../../../services/dateService/interfaces/DateInterface";
import {DateService} from "../../../services/dateService/DateService";
import {PlotService} from "../../../services/plotsService/PlotService";
import {AnalyserService} from "../../../services/analyserService/AnalyserService";
import {SceneType} from "../../../services/analyserService/enums/SceneType";
import {FantasyCalendarCategory} from "../../../services/fantasyCalendarService/enums/FantasyCalendarCategory";
import {SceneFeedbackInterface} from "../interfaces/SceneFeedbackInterface";

export abstract class AbstractSceneData extends AbstractModel implements SceneDataInterface {
	protected metadata: SceneMetadataInterface;

	public get action(): string | undefined {
		const response: string|undefined = this.metadata.data?.action;

		if (response === undefined || response === '')
			return undefined;

		return response;
	}

	public get feedback(): SceneFeedbackInterface|undefined{
		return this.metadata?.data?.feedback;
	}

	public get trigger(): string | undefined {
		const response: string|undefined = this.metadata.data?.trigger;

		if (response === undefined || response === '')
			return undefined;

		return response;
	}

	get date(): DateInterface | undefined {
		return this.api.service(DateService).getDate(
			this.metadata.data?.date,
			FantasyCalendarCategory.Scene,
			this,
		);
	}

	get isExciting(): boolean {
		return (this.metadata.data?.isActedUpon !== undefined && this.metadata.data.isActedUpon === true);
	}

	get sceneType(): SceneType | undefined {
		if (this.metadata.data?.sceneType == undefined || this.metadata.data.sceneType === '')
			return undefined;

		return this.api.service(AnalyserService).getSceneType(this.metadata.data.sceneType);
	}

	get storyCircleStage(): StoryCircleStage | undefined {
		if (this.metadata.data?.storyCircleStage == undefined || this.metadata.data.storyCircleStage === '')
			return undefined;

		return this.api.service(PlotService).getStoryCircleStage(this.metadata.data.storyCircleStage);
	}
}
