import {AbstractComponent} from "../../../abstracts/AbstractComponent";
import {GenericDataListInterface} from "../../../interfaces/data/GenericDataListInterface";
import {ResponseElementInterface} from "../../../interfaces/response/ResponseElementInterface";
import {ResponseTable} from "../../../data/responses/ResponseTable";
import {ContentFactory} from "../../../factories/ContentFactory";
import {ContentType} from "../../../enums/ContentType";
import {EventDataInterface} from "../../../interfaces/data/EventDataInterface";

export class EventTableComponent extends AbstractComponent {
	generateData(
		data: GenericDataListInterface,
		title:string|null,
	): ResponseElementInterface | null {
		if (data.elements.length === 0){
			return null;
		}

		const response = new ResponseTable();

		response.addTitle(title ? title : 'Events');
		response.addHeaders([
			ContentFactory.create('', ContentType.String, true),
			ContentFactory.create('Name', ContentType.String),
			ContentFactory.create('Date', ContentType.String),
			ContentFactory.create('Synopsis', ContentType.String),
		]);
		data.elements.forEach((event: EventDataInterface) => {
			response.addContent([
				ContentFactory.create(event.imageSrcElement, ContentType.Image, true),
				ContentFactory.create(event.link, ContentType.Link, true),
				ContentFactory.create(event.date, ContentType.String),
				ContentFactory.create(event.synopsis, ContentType.Markdown),
			])
		});

		return response;
	}
}
