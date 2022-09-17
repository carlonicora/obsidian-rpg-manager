import {AbstractComponent} from "../abstracts/AbstractComponent";
import {ResponseElementInterface} from "../interfaces/response/ResponseElementInterface";
import {ResponseTable} from "../data/responses/ResponseTable";
import {ContentType} from "../enums/ContentType";
import {RecordInterface} from "../interfaces/database/RecordInterface";
import {AdventureInterface} from "../interfaces/data/AdventureInterface";
import {RelationshipInterface} from "../interfaces/RelationshipInterface";
import {AVal} from "tern";
import {Adventure} from "../data/Adventure";

export class AdventureTableComponent extends AbstractComponent {
	public async generateData(
		relationships: RelationshipInterface[],
		title:string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseElementInterface|null> {
		if (relationships.length === 0) return null;

		const response = new ResponseTable(this.app);
		response.addTitle(title ? title : 'Adventures');
		response.addHeaders([
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create('#', ContentType.String, true),
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create('Adventure', ContentType.String),
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create('Synopsis', ContentType.String),
		]);
		relationships.forEach((relationship: RelationshipInterface) => {
			const adventure: AdventureInterface|undefined = relationship.component as AdventureInterface;
			if (adventure !== undefined) {
				response.addContent([
					this.app.plugins.getPlugin('rpg-manager').factories.contents.create(adventure.adventureId, ContentType.Number, true),
					this.app.plugins.getPlugin('rpg-manager').factories.contents.create(adventure.link, ContentType.Link),
					this.app.plugins.getPlugin('rpg-manager').factories.contents.create(adventure.synopsis, ContentType.Markdown),
				])
			}
		});

		return response;
	}
}
