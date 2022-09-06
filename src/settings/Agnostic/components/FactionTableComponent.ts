import {AbstractComponent} from "../../../abstracts/AbstractComponent";
import {ResponseTable} from "../../../data/responses/ResponseTable";
import {ContentFactory} from "../../../factories/ContentFactory";
import {ContentType} from "../../../enums/ContentType";
import {ResponseElementInterface} from "../../../interfaces/response/ResponseElementInterface";
import {FactionInterface, RpgDataInterface} from "../../../Data";

export class FactionTableComponent extends AbstractComponent {
	generateData(
		data: RpgDataInterface[],
		title:string|null,
	): ResponseElementInterface | null {
		if (data.length === 0){
			return null;
		}

		const response = new ResponseTable();

		response.addTitle(title ? title : 'Factions');
		response.addHeaders([
			ContentFactory.create('', ContentType.String, true),
			ContentFactory.create('Faction', ContentType.String),
			ContentFactory.create('Synopsis', ContentType.String),
		]);
		data.forEach((faction: FactionInterface) => {
			response.addContent([
				ContentFactory.create(faction.imageSrcElement, ContentType.Image, true),
				ContentFactory.create(faction.link, ContentType.Link, true),
				ContentFactory.create(faction.additionalInformation ?? faction.synopsis, ContentType.Markdown),
			])
		});

		return response;
	}
}
