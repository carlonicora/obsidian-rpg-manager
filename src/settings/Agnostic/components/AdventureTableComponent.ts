import {AbstractComponent} from "../../../abstracts/AbstractComponent";
import {ResponseElementInterface} from "../../../interfaces/response/ResponseElementInterface";
import {ResponseTable} from "../../../data/responses/ResponseTable";
import {ContentFactory} from "../../../factories/ContentFactory";
import {ContentType} from "../../../enums/ContentType";
import {AdventureInterface, RpgDataInterface} from "../../../Data";

export class AdventureTableComponent extends AbstractComponent {
	public generateData(
		data: RpgDataInterface[],
		title:string|null,
	): ResponseElementInterface|null {
		if (data.length === 0){
			return null;
		}

		const response = new ResponseTable();
		response.addTitle(title ? title : 'Adventures');
		response.addHeaders([
			ContentFactory.create('#', ContentType.String, true),
			ContentFactory.create('Adventure', ContentType.String),
			ContentFactory.create('Synopsis', ContentType.String),
		]);
		data.forEach((adventure: AdventureInterface) => {
			response.addContent([
				ContentFactory.create(adventure.adventureId, ContentType.Number, true),
				ContentFactory.create(adventure.link, ContentType.Link),
				ContentFactory.create(adventure.synopsis, ContentType.Markdown),
			])
		});

		return response;
	}
}
