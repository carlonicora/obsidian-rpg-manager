import {AbstractComponent} from "../../../abstracts/AbstractComponent";
import {ResponseElementInterface} from "../../../interfaces/response/ResponseElementInterface";
import {ResponseTable} from "../../../data/responses/ResponseTable";
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

		const response = new ResponseTable(this.app);
		response.addTitle(title ? title : 'Sessions');
		response.addHeaders([
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create('#', ContentType.String, true),
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create('Session', ContentType.String),
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create('Synopsis', ContentType.String),
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create('Date', ContentType.String),
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create('Play Date', ContentType.String),
		]);
		data.forEach((session: SessionInterface) => {
			response.addContent([
				this.app.plugins.getPlugin('rpg-manager').factories.contents.create(session.sessionId, ContentType.Number, true),
				this.app.plugins.getPlugin('rpg-manager').factories.contents.create(session.link, ContentType.Link),
				this.app.plugins.getPlugin('rpg-manager').factories.contents.create(session.synopsis, ContentType.Markdown),
				this.app.plugins.getPlugin('rpg-manager').factories.contents.create(session.date?.toDateString(), ContentType.String, true),
				this.app.plugins.getPlugin('rpg-manager').factories.contents.create(session.irl?.toDateString(), ContentType.String, true),
			])
		});
		return response;
	}
}
