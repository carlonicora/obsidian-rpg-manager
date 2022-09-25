import {AbstractComponent} from "../abstracts/AbstractComponent";
import {ResponseElementInterface} from "../interfaces/response/ResponseElementInterface";
import {ResponseTable} from "../data/responses/ResponseTable";
import {ContentType} from "../enums/ContentType";
import {EventInterface} from "../interfaces/data/EventInterface";
import {RelationshipInterface} from "../interfaces/RelationshipInterface";

export class EventTableComponent extends AbstractComponent {
	public async generateData(
		relationships: RelationshipInterface[],
		title:string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseElementInterface|null> {
		if (relationships.length === 0) return null;

		const response = new ResponseTable(this.app);

		response.addTitle(title ? title : 'Events');
		response.addHeaders([
			this.factories.contents.create('', ContentType.String, true),
			this.factories.contents.create('Name', ContentType.String),
			this.factories.contents.create('Date', ContentType.String),
			this.factories.contents.create('Synopsis', ContentType.String),
		]);
		relationships.forEach((relationship: RelationshipInterface) => {
			const record: EventInterface|undefined = relationship.component as EventInterface;
			if (record !== undefined) {
				response.addContent([
					this.factories.contents.create(record.imageSrcElement, ContentType.Image, true),
					this.factories.contents.create(record.link, ContentType.Link),
					this.factories.contents.create(record.date?.toDateString(), ContentType.Date, true),
					this.factories.contents.create(relationship.description !== '' ? relationship.description : record.synopsis, ContentType.Markdown),
				])
			}
		});

		return response;
	}
}
