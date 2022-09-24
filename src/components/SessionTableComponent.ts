import {AbstractComponent} from "../abstracts/AbstractComponent";
import {ResponseElementInterface} from "../interfaces/response/ResponseElementInterface";
import {ResponseTable} from "../data/responses/ResponseTable";
import {ContentType} from "../enums/ContentType";
import {RelationshipInterface} from "../interfaces/RelationshipInterface";
import {SessionInterface} from "../interfaces/data/SessionInterface";

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
			this.factories.contents.create('Scene', ContentType.String),
			this.factories.contents.create('Date', ContentType.String),
			this.factories.contents.create('Synopsis', ContentType.String),
		]);
		relationships.forEach((relationship: RelationshipInterface) => {
			const session: SessionInterface|undefined = relationship.component as SessionInterface;
			if (session !== undefined) {
				response.addContent([
					this.factories.contents.create(session.sessionId.toString(), ContentType.String, true),
					this.factories.contents.create(session.link, ContentType.Link),
					this.factories.contents.create(session.irl?.toDateString(), ContentType.Date, true),
					this.factories.contents.create(session.synopsis, ContentType.Markdown),
				]);
			}
		});
		return response;
	}
}
