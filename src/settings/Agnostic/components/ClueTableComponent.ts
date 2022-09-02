import {AbstractComponent} from "../../../abstracts/AbstractComponent";
import {GenericDataListInterface} from "../../../interfaces/data/GenericDataListInterface";
import {ResponseElementInterface} from "../../../interfaces/response/ResponseElementInterface";
import {ResponseTable} from "../../../data/ResponseTable";
import {ContentFactory} from "../../../factories/ContentFactory";
import {ContentType} from "../../../enums/ContentType";
import {ClueDataInterface} from "../../../interfaces/data/ClueDataInterface";

export class ClueTableComponent extends AbstractComponent {
	generateData(
		data: GenericDataListInterface,
		title:string|null,
	): ResponseElementInterface | null {
		if (data.elements.length === 0){
			return null;
		}

		const response = new ResponseTable();

		response.addTitle(title ? title : 'Clues');
		response.addHeaders([
			ContentFactory.create('', ContentType.String, true),
			ContentFactory.create('Clue', ContentType.String),
			ContentFactory.create('Found', ContentType.String),
			ContentFactory.create('Synopsis', ContentType.String),
		]);
		data.elements.forEach((clue: ClueDataInterface) => {
			response.addContent([
				ContentFactory.create(clue.imageSrcElement, ContentType.Image, true),
				ContentFactory.create(clue.link, ContentType.Link, true),
				ContentFactory.create((clue.found === false ? '<span class="rpgm-missing">no</span>' : clue.found), ContentType.Markdown),
				ContentFactory.create(clue.synopsis, ContentType.Markdown),
			])
		});

		return response;
	}
}
