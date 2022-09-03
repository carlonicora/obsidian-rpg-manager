import {AbstractComponent} from "../../../abstracts/AbstractComponent";
import {GenericDataListInterface} from "../../../interfaces/data/GenericDataListInterface";
import {ResponseTable} from "../../../data/responses/ResponseTable";
import {ContentFactory} from "../../../factories/ContentFactory";
import {ContentType} from "../../../enums/ContentType";
import {FactionDataInterface} from "../../../interfaces/data/FactionDataInterface";
import {ResponseElementInterface} from "../../../interfaces/response/ResponseElementInterface";

export class FactionTableComponent extends AbstractComponent {
	generateData(
		data: GenericDataListInterface,
		title:string|null,
	): ResponseElementInterface | null {
		if (data.elements.length === 0){
			return null;
		}

		const response = new ResponseTable();

		response.addTitle(title ? title : 'Factions');
		response.addHeaders([
			ContentFactory.create('', ContentType.String, true),
			ContentFactory.create('Faction', ContentType.String),
			ContentFactory.create('Synopsis', ContentType.String),
		]);
		data.elements.forEach((faction: FactionDataInterface) => {
			response.addContent([
				ContentFactory.create(faction.imageSrcElement, ContentType.Image, true),
				ContentFactory.create(faction.link, ContentType.Link, true),
				ContentFactory.create(faction.synopsis, ContentType.Markdown),
			])
		});

		return response;
	}
}
