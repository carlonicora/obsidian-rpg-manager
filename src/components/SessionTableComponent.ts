import {AbstractComponent} from "../abstracts/AbstractComponent";
import {ResponseElementInterface} from "../interfaces/response/ResponseElementInterface";
import {ResponseTable} from "../data/responses/ResponseTable";
import {ContentType} from "../enums/ContentType";
import {SessionInterface} from "../interfaces/data/SessionInterface";
import {RelationshipInterface} from "../interfaces/RelationshipInterface";

export class SessionTableComponent extends AbstractComponent {
	public async generateData(
		relationships: RelationshipInterface[],
		title:string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseElementInterface|null> {
		if (relationships.length === 0) return null;

		const response = new ResponseTable(this.app);
		response.addTitle(title ? title : 'Sessions');
		response.addHeaders([
			this.factories.contents.create('#', ContentType.String, true),
			this.factories.contents.create('Session', ContentType.String),
			this.factories.contents.create('Synopsis', ContentType.String),
			this.factories.contents.create('Date', ContentType.String),
			this.factories.contents.create('Play Date', ContentType.String),
		]);
		relationships.forEach((relationship: RelationshipInterface) => {
			const session: SessionInterface|undefined = relationship.component as SessionInterface;

			if (session !== undefined) {
				response.addContent([
					this.factories.contents.create(session.sessionId, ContentType.Number, true),
					this.factories.contents.create(session.link, ContentType.Link),
					this.factories.contents.create(session.synopsis, ContentType.Markdown),
					this.factories.contents.create(session.date?.toDateString(), ContentType.String, true),
					this.factories.contents.create(session.irl?.toDateString(), ContentType.String, true),
				])
			}
		});
		return response;
	}
}
