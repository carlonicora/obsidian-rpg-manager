import {AbstractComponent} from "../../../abstracts/AbstractComponent";
import {ResponseElementInterface} from "../../../interfaces/response/ResponseElementInterface";
import {ResponseTable} from "../../../data/responses/ResponseTable";
import {ContentFactory} from "../../../factories/ContentFactory";
import {ContentType} from "../../../enums/ContentType";
import {ClueInterface, RpgDataInterface} from "../../../Data";

export class ClueTableComponent extends AbstractComponent {
	generateData(
		data: RpgDataInterface[],
		title:string|null,
	): ResponseElementInterface | null {
		if (data.length === 0){
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
		data.forEach((clue: ClueInterface) => {
			response.addContent([
				ContentFactory.create(clue.imageSrcElement, ContentType.Image, true),
				ContentFactory.create(clue.link, ContentType.Link, true),
				ContentFactory.create((clue.isFound ? clue.found?.toDateString() : '<span class="rpgm-missing">no</span>'), ContentType.Markdown),
				ContentFactory.create(clue.additionalInformation ?? clue.synopsis, ContentType.Markdown),
			])
		});

		return response;
	}
}
