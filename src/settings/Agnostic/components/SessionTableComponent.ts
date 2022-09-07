import {AbstractComponent} from "../../../abstracts/AbstractComponent";
import {ResponseElementInterface} from "../../../interfaces/response/ResponseElementInterface";
import {ResponseTable} from "../../../data/responses/ResponseTable";
import {ContentFactory} from "../../../factories/ContentFactory";
import {ContentType} from "../../../enums/ContentType";
import {RpgDataInterface} from "../../../interfaces/data/RpgDataInterface";
import {SessionInterface} from "../../../interfaces/data/SessionInterface";

export class SessionTableComponent extends AbstractComponent {
	public generateData(
		data: RpgDataInterface[],
		title:string|null,
	): ResponseElementInterface|null {
		if (data.length === 0){
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
		data.forEach((session: SessionInterface) => {
			response.addContent([
				ContentFactory.create(session.sessionId, ContentType.Number, true),
				ContentFactory.create(session.link, ContentType.Link),
				ContentFactory.create(session.synopsis, ContentType.Markdown),
				ContentFactory.create(session.date?.toDateString(), ContentType.String, true),
				ContentFactory.create(session.irl?.toDateString(), ContentType.String, true),
			])
		});
		return response;
	}
}
