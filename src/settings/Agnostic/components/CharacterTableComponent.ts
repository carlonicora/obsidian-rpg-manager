import {AbstractComponent} from "../../../abstracts/AbstractComponent";
import {ResponseElementInterface} from "../../../interfaces/response/ResponseElementInterface";
import {ResponseTable} from "../../../data/responses/ResponseTable";
import {ContentFactory} from "../../../factories/ContentFactory";
import {ContentType} from "../../../enums/ContentType";
import {CharacterInterface} from "../../../Data";

export class CharacterTableComponent extends AbstractComponent {
	generateData(
		data: CharacterInterface[],
		title:string|null,
	): ResponseElementInterface|null {
		if (data.length === 0){
			return null;
		}

		const response = new ResponseTable();

		response.addTitle(title ? title : 'Characters');
		response.addHeaders([
			ContentFactory.create('', ContentType.String, true),
			ContentFactory.create('Character', ContentType.String),
			ContentFactory.create('Age', ContentType.String),
			ContentFactory.create('Synopsis', ContentType.String),
		]);
		data.forEach((character: CharacterInterface) => {
			response.addContent([
				ContentFactory.create(character.imageSrcElement, ContentType.Image, true),
				ContentFactory.create(character.link, ContentType.Link, true),
				ContentFactory.create(character.age?.toString(), ContentType.String, true),
				ContentFactory.create(character.additionalInformation ?? character.synopsis, ContentType.Markdown),
			])
		});

		return response;
	}
}
