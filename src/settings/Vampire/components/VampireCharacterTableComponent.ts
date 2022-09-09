import {AbstractComponent} from "../../../abstracts/AbstractComponent";
import {ResponseElementInterface} from "../../../interfaces/response/ResponseElementInterface";
import {ResponseTable} from "../../../data/responses/ResponseTable";
import {ContentType} from "../../../enums/ContentType";
import {VampireCharacterInterface} from "../interfaces/VampireCharacterInterface";

export class VampireCharacterTableComponent extends AbstractComponent {
	generateData(
		data: VampireCharacterInterface[],
		title:string|null,
	): ResponseElementInterface|null {
		if (data.length === 0){
			return null;
		}

		const response = new ResponseTable(this.app);

		response.addTitle(title ? title : 'Characters');
		response.addHeaders([
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create('', ContentType.String, true),
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create('Character', ContentType.String),
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create('Generation', ContentType.String),
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create('Synopsis', ContentType.String),
		]);
		data.forEach((character: VampireCharacterInterface) => {
			response.addContent([
				this.app.plugins.getPlugin('rpg-manager').factories.contents.create(character.imageSrcElement, ContentType.Image, true),
				this.app.plugins.getPlugin('rpg-manager').factories.contents.create(character.link, ContentType.Link, true),
				this.app.plugins.getPlugin('rpg-manager').factories.contents.create(character.generation?.toString(), ContentType.String, true),
				this.app.plugins.getPlugin('rpg-manager').factories.contents.create(character.additionalInformation ?? character.synopsis, ContentType.Markdown),
			])
		});

		return response;
	}
}
