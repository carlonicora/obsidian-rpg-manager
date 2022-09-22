import {AbstractComponent} from "../abstracts/AbstractComponent";
import {ResponseElementInterface} from "../interfaces/response/ResponseElementInterface";
import {ResponseTable} from "../data/responses/ResponseTable";
import {ContentType} from "../enums/ContentType";
import {CharacterInterface} from "../interfaces/data/CharacterInterface";
import {RelationshipInterface} from "../interfaces/RelationshipInterface";

export class CharacterTableComponent extends AbstractComponent {
	public async generateData(
		relationships: RelationshipInterface[],
		title:string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseElementInterface|null> {
		if (relationships.length === 0) return null;

		const response = new ResponseTable(this.app);

		response.addTitle(title ? title : 'Characters');
		response.addHeaders([
			this.factories.contents.create('', ContentType.String, true),
			this.factories.contents.create('Character', ContentType.String),
			this.factories.contents.create('Age', ContentType.String),
			this.factories.contents.create('Synopsis', ContentType.String),
		]);
		relationships.forEach((relationship: RelationshipInterface) => {
			const record: CharacterInterface|undefined = relationship.component as CharacterInterface;
			if (record !== undefined) {
				response.addContent([
					this.factories.contents.create(record.imageSrcElement, ContentType.Image, true),
					this.factories.contents.create(record.link + (record.isDead ? '\n_(Deceased)_' : ''), ContentType.Link, true),
					this.factories.contents.create(record.age?.toString(), ContentType.String, true),
					this.factories.contents.create(relationship.description !== '' ? relationship.description : record.synopsis, ContentType.Markdown),
				]);
			}
		});

		return response;
	}
}
