import {AbstractComponent} from "../../../abstracts/AbstractComponent";
import {GenericDataListInterface} from "../../../interfaces/data/GenericDataListInterface";
import {ResponseElementInterface} from "../../../interfaces/response/ResponseElementInterface";
import {ResponseTable} from "../../../data/ResponseTable";
import {ContentFactory} from "../../../factories/ContentFactory";
import {ContentType} from "../../../enums/ContentType";
import {SessionDataInterface} from "../../../interfaces/data/SessionDataInterface";

export class SessionTableComponent extends AbstractComponent {
	public generateData(
		data: GenericDataListInterface,
		title:string|null,
	): ResponseElementInterface|null {
		if (data.elements.length === 0){
			return null;
		}

		const response = new ResponseTable();
		response.addTitle(title ? title : 'Sessions');
		response.addHeaders([
			ContentFactory.create('#', ContentType.String, true),
			ContentFactory.create('Session', ContentType.String),
			ContentFactory.create('Synopsis', ContentType.String),
			ContentFactory.create('Date', ContentType.String),
			ContentFactory.create('Play Date', ContentType.String),
		]);
		data.elements.forEach((session: SessionDataInterface) => {
			response.addContent([
				ContentFactory.create(session.id, ContentType.Number, true),
				ContentFactory.create(session.link, ContentType.Link),
				ContentFactory.create(session.synopsis, ContentType.Markdown),
				ContentFactory.create(session.date, ContentType.String, true),
				ContentFactory.create(session.irl, ContentType.String, true),
			])
		});
		return response;
	}
}
