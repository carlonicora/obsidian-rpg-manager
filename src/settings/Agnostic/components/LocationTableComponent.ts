import {AbstractComponent} from "../../../abstracts/AbstractComponent";
import {ResponseTable} from "../../../data/responses/ResponseTable";
import {ContentFactory} from "../../../factories/ContentFactory";
import {ContentType} from "../../../enums/ContentType";
import {ResponseElementInterface} from "../../../interfaces/response/ResponseElementInterface";
import {RpgDataInterface} from "../../../interfaces/data/RpgDataInterface";
import {LocationInterface} from "../../../interfaces/data/LocationInterface";

export class LocationTableComponent extends AbstractComponent {
	generateData(
		data: RpgDataInterface[],
		title:string|null,
	): ResponseElementInterface | null {
		if (data.length === 0){
			return null;
		}

		const response = new ResponseTable();

		response.addTitle(title ? title : 'Locations');
		response.addHeaders([
			ContentFactory.create('', ContentType.String, true),
			ContentFactory.create('Name', ContentType.String),
			ContentFactory.create('Synopsis', ContentType.String),
		]);
		data.forEach((location: LocationInterface
		) => {
			response.addContent([
				ContentFactory.create(location.imageSrcElement, ContentType.Image, true),
				ContentFactory.create(location.link, ContentType.Link, true),
				ContentFactory.create(location.additionalInformation ?? location.synopsis, ContentType.Markdown),
			])
		});

		return response;
	}
}
