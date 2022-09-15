import {AbstractComponent} from "../abstracts/AbstractComponent";
import {ResponseElementInterface} from "../interfaces/response/ResponseElementInterface";
import {ResponseTable} from "../data/responses/ResponseTable";
import {ContentType} from "../enums/ContentType";
import {RecordInterface} from "../interfaces/database/RecordInterface";
import {EventInterface} from "../interfaces/data/EventInterface";

export class EventTableComponent extends AbstractComponent {
	public async generateData(
		data: RecordInterface[],
		title:string|null,
	): Promise<ResponseElementInterface|null> {
		if (data.length === 0){
			return null;
		}

		const response = new ResponseTable(this.app);

		response.addTitle(title ? title : 'Events');
		response.addHeaders([
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create('', ContentType.String, true),
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create('Name', ContentType.String),
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create('Date', ContentType.String),
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create('Synopsis', ContentType.String),
		]);
		data.forEach((event: EventInterface) => {
			response.addContent([
				this.app.plugins.getPlugin('rpg-manager').factories.contents.create(event.imageSrcElement, ContentType.Image, true),
				this.app.plugins.getPlugin('rpg-manager').factories.contents.create(event.link, ContentType.Link, true),
				this.app.plugins.getPlugin('rpg-manager').factories.contents.create(event.date?.toDateString(), ContentType.String),
				this.app.plugins.getPlugin('rpg-manager').factories.contents.create(event.additionalInformation ?? event.synopsis, ContentType.Markdown),
			])
		});

		return response;
	}
}
