import {ContentType} from "../../../../responses/enums/ContentType";
import {AbstractTableSubModel} from "../../../../models/abstracts/AbstractTableSubModel";
import {RpgManagerAdvancedSettingsListsInterface} from "../../../../settings/RpgManagerSettingsInterface";
import {ContentInterface} from "../../../../responses/contents/interfaces/ContentInterface";
import {TableField} from "../../../../views/enums/TableField";
import {SceneType} from "../../../enums/SceneType";
import {ComponentInterface} from "../../../interfaces/ComponentInterface";
import {SceneInterface} from "../interfaces/SceneInterface";
import {RelationshipInterface} from "../../../../relationships/interfaces/RelationshipInterface";

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

	protected generateContentElement<T extends ComponentInterface>(
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
				return this.factories.contents.create((scene.date != null ? scene.date.toDateString() : ''), ContentType.Date, true);
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
		if (date == null) return '';

		const hours = date.getHours();
		const minutes = date.getMinutes();

		return (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes);
	}
}
