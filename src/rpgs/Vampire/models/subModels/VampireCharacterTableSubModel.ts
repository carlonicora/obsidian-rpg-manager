import {AbstractSubModel} from "../../../../abstracts/AbstractSubModel";
import {ResponseDataElementInterface} from "../../../../interfaces/response/ResponseDataElementInterface";
import {ResponseTable} from "../../../../responses/ResponseTable";
import {ContentType} from "../../../../enums/ContentType";
import {VampireCharacterInterface} from "../../interfaces/VampireCharacterInterface";
import {RelationshipInterface} from "../../../../interfaces/RelationshipInterface";

export class VampireCharacterTableSubModel extends AbstractSubModel {
	public async generateData(
		relationships: RelationshipInterface[],
		title:string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseDataElementInterface|null> {
		if (relationships.length === 0) return null;

		const response = new ResponseTable(this.app, this.currentElement);

		response.addTitle(title ? title : 'Characters');
		response.addHeaders([
			this.factories.contents.create('', ContentType.String, true),
			this.factories.contents.create('Character', ContentType.String),
			this.factories.contents.create('Generation', ContentType.String),
			this.factories.contents.create('Synopsis', ContentType.String),
		]);
		relationships.forEach((relationship: RelationshipInterface) => {
			const character: VampireCharacterInterface|undefined = relationship.component as VampireCharacterInterface;

			if (character !== undefined) {
				response.addContent([
					this.factories.contents.create(character.imageSrcElement, ContentType.Image, true),
					this.factories.contents.create(character.link, ContentType.Link, true),
					this.factories.contents.create(character.generation?.toString(), ContentType.String, true),
					this.factories.contents.create(character.additionalInformation ?? character.synopsis, ContentType.Markdown),
				])
			}
		});

		return response;
	}
}
