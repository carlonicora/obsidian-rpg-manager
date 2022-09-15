import {AbstractComponent} from "../abstracts/AbstractComponent";
import {ResponseTable} from "../data/responses/ResponseTable";
import {ContentType} from "../enums/ContentType";
import {ResponseElementInterface} from "../interfaces/response/ResponseElementInterface";
import {RecordInterface} from "../interfaces/database/RecordInterface";

export class FactionTableComponent extends AbstractComponent {
	public async generateData(
		data: RecordInterface[],
		title:string|null,
	): Promise<ResponseElementInterface|null> {
		if (data.length === 0){
			return null;
		}

		const response = new ResponseTable(this.app);

		response.addTitle(title ? title : 'Factions');
		response.addHeaders([
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create('', ContentType.String, true),
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create('Faction', ContentType.String),
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create('Synopsis', ContentType.String),
		]);
		data.forEach((faction: RecordInterface) => {
			response.addContent([
				this.app.plugins.getPlugin('rpg-manager').factories.contents.create(faction.imageSrcElement, ContentType.Image, true),
				this.app.plugins.getPlugin('rpg-manager').factories.contents.create(faction.link, ContentType.Link, true),
				this.app.plugins.getPlugin('rpg-manager').factories.contents.create(faction.additionalInformation ?? faction.synopsis, ContentType.Markdown),
			])
		});

		return response;
	}
}
