import {AbstractComponent} from "../abstracts/AbstractComponent";
import {ResponseElementInterface} from "../interfaces/response/ResponseElementInterface";
import {ResponseTable} from "../data/responses/ResponseTable";
import {ContentType} from "../enums/ContentType";
import {SceneInterface} from "../interfaces/data/SceneInterface";
import {RelationshipInterface} from "../interfaces/RelationshipInterface";
import {RecordType} from "../enums/RecordType";

export class SceneTableComponent extends AbstractComponent {
	public async generateData(
		relationships: RelationshipInterface[],
		title:string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseElementInterface|null> {
		if (relationships.length === 0) return null;

		const response = new ResponseTable(this.app);

		response.addTitle(title ? title : 'Scenes');

		const headers = [
			this.factories.contents.create('#', ContentType.String, true),
			this.factories.contents.create('', ContentType.String, true),
			this.factories.contents.create('Scene', ContentType.String),
			this.factories.contents.create('Synopsis', ContentType.String),
			this.factories.contents.create('Date', ContentType.String),
		];

		if (additionalInformation?.parentType === RecordType.Session ){
			headers.push(this.factories.contents.create('Start', ContentType.String));
			headers.push(this.factories.contents.create('End', ContentType.String));
			headers.push(this.factories.contents.create('Duration', ContentType.String))
		}

		response.addHeaders(headers);
		let counter = 0;
		relationships.forEach((relationship: RelationshipInterface) => {
			counter++;
			const scene: SceneInterface|undefined = relationship.component as SceneInterface;
			if (scene !== undefined) {
				const row = [
					this.factories.contents.create(scene.completed ? counter.toString() : '**' + counter.toString() + '**', ContentType.Markdown, true),
					this.factories.contents.create('pieEighth', ContentType.SVG, true, {storyCircleStage: scene.storycircleStage}),
					this.factories.contents.create(scene.link + (scene.completed ? '' : ' _(incomplete)_'), ContentType.Link),
					this.factories.contents.create(scene.synopsis, ContentType.Markdown),
					this.factories.contents.create((scene.date != null ? scene.date.toDateString() : ''), ContentType.Date, true),
				];

				if (additionalInformation?.parentType === RecordType.Session ){
					row.push(this.factories.contents.create(this.formatTime(scene.startTime), ContentType.Date, true));
					row.push(this.factories.contents.create(this.formatTime(scene.endTime), ContentType.Date, true));
					row.push(this.factories.contents.create(scene.duration, ContentType.Date, true));
				}

				response.addContent(row);
			}
		});
		return response;
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
