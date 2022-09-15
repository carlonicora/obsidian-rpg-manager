import {AbstractComponent} from "../abstracts/AbstractComponent";
import {ResponseTable} from "../data/responses/ResponseTable";
import {ContentType} from "../enums/ContentType";
import {ResponseElementInterface} from "../interfaces/response/ResponseElementInterface";
import {RecordInterface} from "../interfaces/database/RecordInterface";
import {LocationInterface} from "../interfaces/data/LocationInterface";

export class LocationTableComponent extends AbstractComponent {
	public async generateData(
		data: RecordInterface[],
		title:string|null,
	): Promise<ResponseElementInterface|null> {
		if (data.length === 0){
			return null;
		}

		const response = new ResponseTable(this.app);

		response.addTitle(title ? title : 'Locations');
		response.addHeaders([
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create('', ContentType.String, true),
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create('Name', ContentType.String),
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create('Synopsis', ContentType.String),
		]);
		data.forEach((location: LocationInterface
		) => {
			response.addContent([
				this.app.plugins.getPlugin('rpg-manager').factories.contents.create(location.imageSrcElement, ContentType.Image, true),
				this.app.plugins.getPlugin('rpg-manager').factories.contents.create(location.link, ContentType.Link, true),
				this.app.plugins.getPlugin('rpg-manager').factories.contents.create(location.additionalInformation ?? location.synopsis, ContentType.Markdown),
			])
		});

		return response;
	}
}
