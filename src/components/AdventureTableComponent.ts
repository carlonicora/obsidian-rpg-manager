import {AbstractComponent} from "../abstracts/AbstractComponent";
import {ResponseElementInterface} from "../interfaces/response/ResponseElementInterface";
import {ResponseTable} from "../data/responses/ResponseTable";
import {ContentType} from "../enums/ContentType";
import {AdventureInterface} from "../interfaces/data/AdventureInterface";
import {RelationshipInterface} from "../interfaces/RelationshipInterface";

export class AdventureTableComponent extends AbstractComponent {
	public async generateData(
		relationships: RelationshipInterface[],
		title:string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseElementInterface|null> {
		if (relationships.length === 0) return null;

		const response = new ResponseTable(this.app, this.currentElement);
		response.addTitle(title ? title : 'Adventures');
		response.addHeaders([
			this.factories.contents.create('#', ContentType.String, true),
			this.factories.contents.create('Adventure', ContentType.String),
			this.factories.contents.create('Synopsis', ContentType.String),
		]);
		relationships.forEach((relationship: RelationshipInterface) => {
			const adventure: AdventureInterface|undefined = relationship.component as AdventureInterface;
			if (adventure !== undefined) {
				response.addContent([
					this.factories.contents.create(adventure.adventureId, ContentType.Number, true),
					this.factories.contents.create(adventure.link, ContentType.Link),
					this.factories.contents.create(adventure.synopsis, ContentType.Markdown),
				])
			}
		});

		return response;
	}
}
