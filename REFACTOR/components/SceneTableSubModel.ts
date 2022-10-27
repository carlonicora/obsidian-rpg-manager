import {ContentType} from "../responses/enums/ContentType";
import {AbstractTableSubModel} from "../models/abstracts/AbstractTableSubModel";
import {RpgManagerAdvancedSettingsListsInterface} from "../../src/settings/RpgManagerSettingsInterface";
import {ContentInterface} from "../responses/contents/interfaces/ContentInterface";
import {TableField} from "../views/enums/TableField";
import {SceneType} from "../../src/components/scene/enums/SceneType";
import {ModelInterface} from "../../src/api/modelsManager/interfaces/ModelInterface";
import {SceneInterface} from "../../src/components/scene/interfaces/SceneInterface";
import {RelationshipInterface} from "../../src/services/relationshipsService/interfaces/RelationshipInterface";
import {DateService} from "../../../../REFACTOR/services/dateService/DateService";

export class SceneTableSubModel extends AbstractTableSubModel {
	protected advancedSettings: RpgManagerAdvancedSettingsListsInterface = this.settings.advanced.Agnostic.SceneList;

	protected generateHeaderElement(
		fieldType: TableField,
	): ContentInterface|undefined {
		switch (fieldType) {
			case TableField.Duration:
				return this.factories.contents.create('Duration', ContentType.String);
				break;
			case TableField.SceneType:
				if (!this.settings.useSceneAnalyser) return undefined;
				return this.factories.contents.create('Type', ContentType.String);
				break;
			case TableField.SceneExciting:
				if (!this.settings.useSceneAnalyser) return undefined;
				return this.factories.contents.create('Exciting', ContentType.String);
				break;
			case TableField.StoryCircleIndicator:
				if (!this.settings.usePlotStructures) return undefined;
				return this.factories.contents.create('', ContentType.String);
				break;
		}

		return super.generateHeaderElement(fieldType);
	}

	protected generateContentElement<T extends ModelInterface>(
		index: number,
		fieldType: TableField,
		component: T,
		relationship: RelationshipInterface,
	): ContentInterface|undefined {
		const scene: SceneInterface = <unknown>component as SceneInterface;
		switch (fieldType) {
			case TableField.Index:
				return this.factories.contents.create(scene.isComplete ? index.toString() : '**' + index.toString() + '**', ContentType.Markdown, true);
				break;
			case TableField.Name:
				return this.factories.contents.create(scene.link + (scene.isComplete ? '' : ' _(incomplete)_'), ContentType.Link);
				break;
			case TableField.Date:
				return this.factories.contents.create((this.api.service(DateService).getReadableDate(scene.date, scene) != null ? this.api.services.get<DateService>(DateService)?.getReadableDate(scene.date, scene) : ''), ContentType.Date, true);
				break;
			case TableField.Duration:
				return this.factories.contents.create((scene.duration === '00:00' ? undefined : scene.duration), ContentType.Date, true);
				break;
			case TableField.SceneType:
				if (!this.settings.useSceneAnalyser) return undefined;
				return this.factories.contents.create((scene.sceneType === undefined ? '' : SceneType[scene.sceneType]) + (scene.isActive ? ' *' : ''), ContentType.Date, true);
				break;
			case TableField.SceneExciting:
				if (!this.settings.useSceneAnalyser) return undefined;
				return this.factories.contents.create((scene.isExciting ? 'yes' : ''), ContentType.Date, true);
				break;
			case TableField.StoryCircleIndicator:
				if (!this.settings.usePlotStructures) return undefined;
				return this.factories.contents.create('pieEighth', ContentType.SVG, true, {storyCircleStage: scene.storyCircleStage});
				break;
		}

		return super.generateContentElement(index, fieldType, component, relationship);
	}

	private _formatTime(
		date: Date|null
	): string {
		if (date == null)
			return '';

		const hours = date.getHours();
		const minutes = date.getMinutes();

		return (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes);
	}
}
