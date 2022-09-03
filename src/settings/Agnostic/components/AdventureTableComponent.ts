import {AbstractComponent} from "../../../abstracts/AbstractComponent";
import {GenericDataListInterface} from "../../../interfaces/data/GenericDataListInterface";
import {ResponseElementInterface} from "../../../interfaces/response/ResponseElementInterface";
import {ResponseTable} from "../../../data/responses/ResponseTable";
import {ContentFactory} from "../../../factories/ContentFactory";
import {ContentType} from "../../../enums/ContentType";
import {AdventureDataInterface} from "../../../interfaces/data/AdventureDataInterface";

export class AdventureTableComponent extends AbstractComponent {
	public generateData(
		data: GenericDataListInterface,
		title:string|null,
	): ResponseElementInterface|null {
		if (data.elements.length === 0){
			return null;
		}

		const response = new ResponseTable();
		response.addTitle(title ? title : 'Adventures');
		response.addHeaders([
			ContentFactory.create('#', ContentType.String, true),
			ContentFactory.create('Adventure', ContentType.String),
			ContentFactory.create('Synopsis', ContentType.String),
		]);
		data.elements.forEach((adventure: AdventureDataInterface) => {
			response.addContent([
				ContentFactory.create(adventure.id, ContentType.Number, true),
				ContentFactory.create(adventure.link, ContentType.Link),
				ContentFactory.create(adventure.synopsis, ContentType.Markdown),
			])
		});

		return response;
	}
}
