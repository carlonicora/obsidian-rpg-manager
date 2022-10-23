import {AbstractComponent} from "../../../abstracts/AbstractComponent";
import {SceneDataInterface} from "../interfaces/SceneDataInterface";
import {SceneMetadataInterface} from "../interfaces/SceneMetadataInterface";
import {SceneType} from "../../../enums/SceneType";
import {StoryCircleStage} from "../../../../plots/enums/StoryCircleStage";
import {DateHelper} from "../../../../helpers/DateHelper";
import {DateInterface} from "../../../../services/date/interfaces/DateInterface";
import {DateService} from "../../../../services/date/DateService";

export abstract class AbstractSceneData extends AbstractComponent implements SceneDataInterface {
	protected metadata: SceneMetadataInterface;

	public get action(): string | undefined {
		return this.metadata.data?.action;
	}

	public get trigger(): string | undefined {
		return this.metadata.data?.trigger;
	}

	get date(): DateInterface | undefined {
		return this.api.service.get(DateService)?.getDate(
			this.metadata.data?.date,
			this.frontmatter['fc-date'],
			this,
		);
	}

	get isExciting(): boolean {
		return (this.metadata.data?.isActedUpon !== undefined && this.metadata.data.isActedUpon === true);
	}

	get sceneType(): SceneType | undefined {
		if (this.metadata.data?.sceneType == undefined || this.metadata.data.sceneType === '') return undefined;

		return this.factories.sceneType.createSceneType(this.metadata.data.sceneType)
	}

	get storyCircleStage(): StoryCircleStage | undefined {
		if (this.metadata.data?.storyCircleStage == undefined || this.metadata.data.storyCircleStage === '') return undefined;

		return this.factories.storyCircleStage.createStoryCircleStage(this.metadata.data.storyCircleStage)
	}
}
