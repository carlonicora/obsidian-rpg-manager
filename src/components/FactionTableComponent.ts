import {AbstractComponent} from "../abstracts/AbstractComponent";
import {ResponseTable} from "../data/responses/ResponseTable";
import {ContentType} from "../enums/ContentType";
import {ResponseElementInterface} from "../interfaces/response/ResponseElementInterface";
import {RelationshipInterface} from "../interfaces/RelationshipInterface";
import {FactionInterface} from "../interfaces/data/FactionInterface";

export class FactionTableComponent extends AbstractComponent {
	public async generateData(
		relationships: RelationshipInterface[],
		title:string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseElementInterface|null> {
		if (relationships.length === 0) return null;

		const response = new ResponseTable(this.app);

		response.addTitle(title ? title : 'Factions');
		response.addHeaders([
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create('', ContentType.String, true),
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create('Faction', ContentType.String),
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create('Synopsis', ContentType.String),
		]);
		relationships.forEach((relationship: RelationshipInterface) => {
			const record: FactionInterface|undefined = relationship.component as FactionInterface;
			if (record !== undefined) {
				response.addContent([
					this.app.plugins.getPlugin('rpg-manager').factories.contents.create(record.imageSrcElement, ContentType.Image, true),
					this.app.plugins.getPlugin('rpg-manager').factories.contents.create(record.link, ContentType.Link, true),
					this.app.plugins.getPlugin('rpg-manager').factories.contents.create(relationship.description !== '' ? relationship.description : record.synopsis, ContentType.Markdown),
				])
			}
		});

		return response;
	}
}
