import {ContentType} from "../../enums/ContentType";
import {SceneInterface} from "../../interfaces/data/SceneInterface";
import {RelationshipInterface} from "../../interfaces/RelationshipInterface";
import {AbstractTableComponent} from "../../abstracts/AbstractTableComponent";
import {RpgManagerAdvancedSettingsListsInterface} from "../../settings/RpgManagerSettingsInterface";
import {RecordInterface} from "../../interfaces/database/RecordInterface";
import {ContentInterface} from "../../interfaces/ContentInterface";

export class SceneTableComponent extends AbstractTableComponent {
	protected advancedSettings: RpgManagerAdvancedSettingsListsInterface = this.settings.advanced.Agnostic.SceneList;

	protected generateHeaderElement(
		fieldName: string,
	): ContentInterface|undefined {
		switch (fieldName.toLowerCase()) {
			case 'starttime':
				return this.factories.contents.create('Start', ContentType.String, true);
				break;
			case 'endtime':
				return this.factories.contents.create('End', ContentType.String, true);
				break;
			case 'duration':
				return this.factories.contents.create('Duration', ContentType.String);
				break;
			case 'storycircleindicator':
				return this.factories.contents.create('', ContentType.String);
				break;
		}

		return super.generateHeaderElement(fieldName);
	}

	protected generateContentElement<T extends RecordInterface>(
		index: number,
		fieldName: string,
		record: T,
		relationship: RelationshipInterface,
	): ContentInterface|undefined {
		const scene: SceneInterface = <unknown>record as SceneInterface;
		switch (fieldName.toLowerCase()) {
			case 'index':
				return this.factories.contents.create(scene.completed ? index.toString() : '**' + index.toString() + '**', ContentType.Markdown, true);
				break;
			case 'name':
				return this.factories.contents.create(scene.link + (scene.completed ? '' : ' _(incomplete)_'), ContentType.Link);
				break;
			case 'starttime':
				return this.factories.contents.create(this.formatTime(scene.startTime), ContentType.Date, true);
				break;
			case 'date':
				return this.factories.contents.create((scene.date != null ? scene.date.toDateString() : ''), ContentType.Date, true);
				break;
			case 'endtime':
				return this.factories.contents.create(this.formatTime(scene.endTime), ContentType.Date, true);
				break;
			case 'duration':
				return this.factories.contents.create(scene.duration, ContentType.Date, true);
				break;
			case 'storycircleindicator':
				return this.factories.contents.create('pieEighth', ContentType.SVG, true, {storyCircleStage: scene.storycircleStage});
				break;
		}

		return super.generateContentElement(index, fieldName, record, relationship);
	}

	private formatTime(
		date: Date|null
	): string {
		if (date == null) return '';

		const hours = date.getHours();
		const minutes = date.getMinutes();

		return (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes);
	}
}
