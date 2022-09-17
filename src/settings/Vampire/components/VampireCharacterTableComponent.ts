import {AbstractComponent} from "../../../abstracts/AbstractComponent";
import {ResponseElementInterface} from "../../../interfaces/response/ResponseElementInterface";
import {ResponseTable} from "../../../data/responses/ResponseTable";
import {ContentType} from "../../../enums/ContentType";
import {VampireCharacterInterface} from "../interfaces/VampireCharacterInterface";
import {RelationshipInterface} from "../../../interfaces/RelationshipInterface";

export class VampireCharacterTableComponent extends AbstractComponent {
	public async generateData(
		relationships: RelationshipInterface[],
		title:string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseElementInterface|null> {
		if (relationships.length === 0) return null;

		const response = new ResponseTable(this.app);

		response.addTitle(title ? title : 'Characters');
		response.addHeaders([
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create('', ContentType.String, true),
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create('Character', ContentType.String),
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create('Generation', ContentType.String),
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create('Synopsis', ContentType.String),
		]);
		relationships.forEach((relationship: RelationshipInterface) => {
			const character: VampireCharacterInterface|undefined = relationship.component as VampireCharacterInterface;

			if (character !== undefined) {
				response.addContent([
					this.app.plugins.getPlugin('rpg-manager').factories.contents.create(character.imageSrcElement, ContentType.Image, true),
					this.app.plugins.getPlugin('rpg-manager').factories.contents.create(character.link, ContentType.Link, true),
					this.app.plugins.getPlugin('rpg-manager').factories.contents.create(character.generation?.toString(), ContentType.String, true),
					this.app.plugins.getPlugin('rpg-manager').factories.contents.create(character.additionalInformation ?? character.synopsis, ContentType.Markdown),
				])
			}
		});

		return response;
	}
}
