import {AbstractComponent} from "../abstracts/AbstractComponent";
import {RelationshipInterface} from "../interfaces/RelationshipInterface";
import {ResponseElementInterface} from "../interfaces/response/ResponseElementInterface";
import {ResponseTable} from "../data/responses/ResponseTable";
import {ContentType} from "../enums/ContentType";
import {SubplotInterface} from "../interfaces/data/SubplotInterface";

export class SubplotTableComponent  extends AbstractComponent {
	public async generateData(
		relationships: RelationshipInterface[],
		title:string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseElementInterface|null> {
		if (relationships.length === 0) return null;

		const response = new ResponseTable(this.app);

		response.addTitle(title ? title : 'Subplots');

		response.addHeaders([
			this.factories.contents.create('Subplot', ContentType.String),
			this.factories.contents.create('Synopsis', ContentType.String),
		]);
		relationships.forEach((relationship: RelationshipInterface) => {
			const subplot: SubplotInterface|undefined = relationship.component as SubplotInterface;
			if (subplot !== undefined) {
				response.addContent([
					this.factories.contents.create(subplot.link, ContentType.Link, true),
					this.factories.contents.create(subplot.synopsis, ContentType.Markdown),
				]);
			}
		});
		return response;
	}
}
