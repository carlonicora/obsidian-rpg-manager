import {AbstractComponent} from "../abstracts/AbstractComponent";
import {ResponseElementInterface} from "../interfaces/response/ResponseElementInterface";
import {ResponseTable} from "../data/responses/ResponseTable";
import {ContentType} from "../enums/ContentType";
import {RecordInterface} from "../interfaces/database/RecordInterface";
import {ClueInterface} from "../interfaces/data/ClueInterface";
import {RelationshipInterface} from "../interfaces/RelationshipInterface";
import {CharacterInterface} from "../interfaces/data/CharacterInterface";

export class ClueTableComponent extends AbstractComponent {
	public async generateData(
		relationships: RelationshipInterface[],
		title:string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseElementInterface|null> {
		if (relationships.length === 0) return null;

		const response = new ResponseTable(this.app);

		response.addTitle(title ? title : 'Clues');
		response.addHeaders([
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create('', ContentType.String, true),
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create('Clue', ContentType.String),
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create('Found', ContentType.String),
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create('Synopsis', ContentType.String),
		]);
		relationships.forEach((relationship: RelationshipInterface) => {
			const record: ClueInterface|undefined = relationship.component as ClueInterface;
			if (record !== undefined) {
				response.addContent([
					this.app.plugins.getPlugin('rpg-manager').factories.contents.create(record.imageSrcElement, ContentType.Image, true),
					this.app.plugins.getPlugin('rpg-manager').factories.contents.create(record.link, ContentType.Link, true),
					this.app.plugins.getPlugin('rpg-manager').factories.contents.create((record.isFound ? record.found?.toDateString() : '<span class="rpgm-missing">no</span>'), ContentType.Markdown),
					this.app.plugins.getPlugin('rpg-manager').factories.contents.create(relationship.description !== '' ? relationship.description : record.synopsis, ContentType.Markdown),
				])
			}
		});

		return response;
	}
}
