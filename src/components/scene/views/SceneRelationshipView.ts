import {AbstractRelationshipView} from "../../../managers/viewsManager/abstracts/AbstractRelationshipView";
import {RelationshipsViewInterface} from "../../../managers/viewsManager/interfaces/RelationshipsViewInterface";
import {TableField} from "../../../services/relationshipsService/enums/TableField";
import {SceneInterface} from "../interfaces/SceneInterface";
import {DateService} from "../../../services/dateService/DateService";

export class SceneRelationshipView extends AbstractRelationshipView implements RelationshipsViewInterface {
	protected canBeOrdered = true;

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
			case TableField.SceneExciting:
				if (!this.api.settings.useSceneAnalyser)
					return '';

				return String(model.isExciting);
			case TableField.StoryCircleIndicator:
				if (!this.api.settings.usePlotStructures)
					return '';

				return model.storyCircleStage?.toString() ?? '';
			case TableField.Date:
				return this.api.service(DateService).getReadableDate(model.date, model);
		}
		return '';
	}
}
