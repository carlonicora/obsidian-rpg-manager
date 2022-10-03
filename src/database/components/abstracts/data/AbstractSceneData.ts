import {AbstractComponent} from "../../../abstracts/AbstractComponent";
import {SceneDataInterface} from "../../interfaces/data/SceneDataInterface";
import {SceneMetadataInterface} from "../../../interfaces/metadata/components/SceneMetadataInterface";
import {SceneType} from "../../../../enums/SceneType";
import {StoryCircleStage} from "../../../../enums/StoryCircleStage";

export abstract class AbstractSceneData extends AbstractComponent implements SceneDataInterface {
	protected metadata: SceneMetadataInterface;

	public get action(): string | undefined {
		return this.metadata.data?.action;
	}

	public get trigger(): string | undefined {
		return this.metadata.data?.trigger;
	}

	get date(): Date | undefined {
		return (this.metadata.data?.date ? new Date(this.metadata.data?.date) : undefined);
	}

	get isActedUpon(): boolean | undefined {
		return this.metadata.data?.isActedUpon;
	}

	get sceneType(): SceneType | undefined {
		if (this.metadata.data?.sceneType === undefined) return undefined;

		return this.factories.sceneType.createSceneType(this.metadata.data.sceneType)
	}

	get storycircleStage(): StoryCircleStage | undefined {
		if (this.metadata.data?.storyCircleStage === undefined) return undefined;

		return this.factories.storyCircleStage.createStoryCircleStage(this.metadata.data.storyCircleStage)
	}
}
