import {AbstractComponent} from "../../../abstracts/AbstractComponent";
import {GenericDataListInterface} from "../../../interfaces/data/GenericDataListInterface";
import {ResponseElementInterface} from "../../../interfaces/response/ResponseElementInterface";
import {ResponseTable} from "../../../data/responses/ResponseTable";
import {ContentFactory} from "../../../factories/ContentFactory";
import {ContentType} from "../../../enums/ContentType";
import {SceneDataInterface} from "../../../interfaces/data/SceneDataInterface";

export class SceneTableComponent extends AbstractComponent {
	generateData(
		data: GenericDataListInterface,
		title: string | null,
	): ResponseElementInterface | null {
		if (data.elements.length === 0){
			return null;
		}

		const response = new ResponseTable();

		response.addTitle(title ? title : 'Scenes');

		response.addHeaders([
			ContentFactory.create('#', ContentType.String, true),
			ContentFactory.create('Scene', ContentType.String),
			ContentFactory.create('Synopsis', ContentType.String),
			ContentFactory.create('Start', ContentType.String),
			ContentFactory.create('End', ContentType.String),
			ContentFactory.create('Duration', ContentType.String),
		]);
		data.elements.forEach((scene: SceneDataInterface) => {
			response.addContent([
				ContentFactory.create(scene.completed ? scene.id.toString() : '**' + scene.id + '**', ContentType.Markdown, true),
				ContentFactory.create(scene.link, ContentType.Link),
				ContentFactory.create(scene.synopsis, ContentType.Markdown),
				ContentFactory.create(scene.startTime, ContentType.String, true),
				ContentFactory.create(scene.endTime, ContentType.String, true),
				ContentFactory.create(scene.duration, ContentType.String, true),
			])
		});
		return response;
	}
}
