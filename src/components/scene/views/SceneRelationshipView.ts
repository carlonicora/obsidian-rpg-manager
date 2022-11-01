import {AbstractRelationshipView} from "../../../managers/viewsManager/abstracts/AbstractRelationshipView";
import {RelationshipsViewInterface} from "../../../managers/viewsManager/interfaces/RelationshipsViewInterface";
import {TableField} from "../../../services/relationshipsService/enums/TableField";
import {SceneInterface} from "../interfaces/SceneInterface";
import {SceneType} from "../../../services/analyserService/enums/SceneType";

export class SceneRelationshipView extends AbstractRelationshipView implements RelationshipsViewInterface {
	protected getFieldValue(
		field: TableField,
		model: SceneInterface,
	): string {
		switch (field){
			case TableField.Duration:
				return model.duration;
				break;
			case TableField.SceneType:
				if (!this.api.settings.useSceneAnalyser)
					return '';

				return model.sceneType?.toString() ?? '';
				break;
			case TableField.SceneExciting:
				if (!this.api.settings.useSceneAnalyser)
					return '';

				return String(model.isExciting);
				break;
			case TableField.StoryCircleIndicator:
				if (!this.api.settings.usePlotStructures)
					return '';

				return model.storyCircleStage?.toString() ?? '';
		}
		return '';
	}
}
