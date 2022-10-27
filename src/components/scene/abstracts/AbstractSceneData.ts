import {AbstractModel} from "../../../managers/modelsManager/abstracts/AbstractModel";
import {SceneDataInterface} from "../interfaces/SceneDataInterface";
import {SceneMetadataInterface} from "../interfaces/SceneMetadataInterface";
import {StoryCircleStage} from "../../../services/plotsServices/enums/StoryCircleStage";
import {DateInterface} from "../../../services/dateService/interfaces/DateInterface";
import {DateService} from "../../../services/dateService/DateService";
import {PlotService} from "../../../services/plotsServices/PlotService";
import {AnalyserService} from "../../../services/analyserService/AnalyserService";
import {SceneType} from "../../../services/analyserService/enums/SceneType";

export abstract class AbstractSceneData extends AbstractModel implements SceneDataInterface {
	protected metadata: SceneMetadataInterface;

	public get action(): string | undefined {
		return this.metadata.data?.action;
	}

	public get trigger(): string | undefined {
		return this.metadata.data?.trigger;
	}

	get date(): DateInterface | undefined {
		return this.api.service(DateService).getDate(
			this.metadata.data?.date,
			this.frontmatter['fc-dateService'],
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
