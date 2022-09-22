import {AbstractComponent} from "../abstracts/AbstractComponent";
import {ResponseElementInterface} from "../interfaces/response/ResponseElementInterface";
import {ResponseTable} from "../data/responses/ResponseTable";
import {ContentType} from "../enums/ContentType";
import {ActInterface} from "../interfaces/data/ActInterface";
import {RelationshipInterface} from "../interfaces/RelationshipInterface";

export class ActTableComponent extends AbstractComponent {
	public async generateData(
		relationships: RelationshipInterface[],
		title:string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseElementInterface|null> {
		if (relationships.length === 0) return null;

		const response = new ResponseTable(this.app);
		response.addTitle(title ? title : 'Acts');
		response.addHeaders([
			this.factories.contents.create('#', ContentType.String, true),
			this.factories.contents.create('Act', ContentType.String),
			this.factories.contents.create('Synopsis', ContentType.String),
		]);
		relationships.forEach((relationship: RelationshipInterface) => {
			const act: ActInterface|undefined = relationship.component as ActInterface;

			if (act !== undefined) {
				response.addContent([
					this.factories.contents.create(act.actId, ContentType.Number, true),
					this.factories.contents.create(act.link, ContentType.Link),
					this.factories.contents.create(act.synopsis, ContentType.Markdown),
				])
			}
		});
		return response;
	}
}
