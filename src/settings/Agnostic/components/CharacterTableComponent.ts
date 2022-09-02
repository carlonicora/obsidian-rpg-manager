import {AbstractComponent} from "../../../abstracts/AbstractComponent";
import {GenericDataListInterface} from "../../../interfaces/data/GenericDataListInterface";
import {ResponseElementInterface} from "../../../interfaces/response/ResponseElementInterface";
import {ResponseTable} from "../../../data/ResponseTable";
import {ContentFactory} from "../../../factories/ContentFactory";
import {ContentType} from "../../../enums/ContentType";
import {CharacterDataInterface} from "../../../interfaces/data/CharacterDataInterface";

export class CharacterTableComponent extends AbstractComponent {
	generateData(
		data: GenericDataListInterface,
		title:string|null,
	): ResponseElementInterface|null {
		if (data.elements.length === 0){
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
		data.elements.forEach((character: CharacterDataInterface) => {
			response.addContent([
				ContentFactory.create(character.imageSrcElement, ContentType.Image, true),
				ContentFactory.create(character.link, ContentType.Link, true),
				ContentFactory.create(character.age, ContentType.String, true),
				ContentFactory.create(character.synopsis, ContentType.Markdown),
			])
		});

		return response;
	}
}
