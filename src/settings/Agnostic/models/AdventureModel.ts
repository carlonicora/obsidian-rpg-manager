import {AbstractModel} from "../../../abstracts/AbstractModel";
import {AdventureData} from "../data";
import {ResponseTable} from "../../../data/ResponseTable";
import {SessionDataInterface} from "../../../interfaces/data/SessionDataInterface";
import {ContentType} from "../../../enums/ContentType";
import {ResponseDataInterface} from "../../../interfaces/response/ResponseDataInterface";
import {ContentFactory} from "../../../factories/ContentFactory";

export class AdventureModel extends AbstractModel {
	public generateData(
	): ResponseDataInterface {
		const adventure = new AdventureData(this.current, this.campaign);

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
			ContentFactory.create('#', ContentType.String, true),
			ContentFactory.create('Session', ContentType.String),
			ContentFactory.create('Synopsis', ContentType.String),
			ContentFactory.create('Date', ContentType.String),
			ContentFactory.create('Play Date', ContentType.String),
		]);
		sessionList.elements.forEach((session: SessionDataInterface) => {
			sessionListTable.addContent([
				ContentFactory.create(session.id, ContentType.Number, true),
				ContentFactory.create(session.link, ContentType.Link),
				ContentFactory.create(session.synopsis, ContentType.Markdown),
				ContentFactory.create(session.date, ContentType.String, true),
				ContentFactory.create(session.irl, ContentType.String, true),
			])
		});
		this.data.addElement(sessionListTable);
	}
}
