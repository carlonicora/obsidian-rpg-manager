import {AbstractModel} from "../../../abstracts/AbstractModel";
import {AdventureData} from "../data";
import {ResponseTable} from "../../../data/ResponseTable";
import {SessionDataInterface} from "../../../interfaces/data/SessionDataInterface";
import {ContentType} from "../../../enums/ContentType";
import {ResponseDataInterface} from "../../../interfaces/response/ResponseDataInterface";
import {Factory} from "../../../Factory";

export class AdventureModel extends AbstractModel {
	public generateData(
	): ResponseDataInterface {
		const adventure = new AdventureData(this.api, this.current, this.campaign);

		this.sessionList(adventure.id);

		return this.data;
	}

	private async sessionList(
		adventureId: number,
	) {
		const sessionList = this.io.getSessionList(adventureId);

		const sessionListTable = new ResponseTable();
		sessionListTable.addTitle('Sessions');
		sessionListTable.addHeaders([
			Factory.createContent('#', ContentType.String, true),
			Factory.createContent('Session', ContentType.String),
			Factory.createContent('Synopsis', ContentType.String),
			Factory.createContent('Date', ContentType.String),
			Factory.createContent('Play Date', ContentType.String),
		]);
		sessionList.elements.forEach((session: SessionDataInterface) => {
			sessionListTable.addContent([
				Factory.createContent(session.id, ContentType.Number, true),
				Factory.createContent(session.link, ContentType.Link),
				Factory.createContent(session.synopsis, ContentType.Markdown),
				Factory.createContent(session.date, ContentType.String, true),
				Factory.createContent(session.irl, ContentType.String, true),
			])
		});
		this.data.addElement(sessionListTable);
	}
}
