import {AbstractComponent} from "../abstracts/AbstractComponent";
import {ResponseElementInterface} from "../interfaces/response/ResponseElementInterface";
import {ResponseTable} from "../data/responses/ResponseTable";
import {ContentType} from "../enums/ContentType";
import {ClueInterface} from "../interfaces/data/ClueInterface";
import {RelationshipInterface} from "../interfaces/RelationshipInterface";

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
			this.factories.contents.create('', ContentType.String, true),
			this.factories.contents.create('Clue', ContentType.String),
			this.factories.contents.create('Found', ContentType.String),
			this.factories.contents.create('Synopsis', ContentType.String),
		]);
		relationships.forEach((relationship: RelationshipInterface) => {
			const record: ClueInterface|undefined = relationship.component as ClueInterface;
			if (record !== undefined) {
				response.addContent([
					this.factories.contents.create(record.imageSrcElement, ContentType.Image, true),
					this.factories.contents.create(record.link, ContentType.Link),
					this.factories.contents.create((record.isFound ? record.found?.toDateString() : '<span class="rpgm-missing">no</span>'), ContentType.Markdown),
					this.factories.contents.create(relationship.description !== '' ? relationship.description : record.synopsis, ContentType.Markdown),
				])
			}
		});

		return response;
	}
}
