import {AbstractComponent} from "../../../abstracts/AbstractComponent";
import {ResponseElementInterface} from "../../../interfaces/response/ResponseElementInterface";
import {ResponseTable} from "../../../data/responses/ResponseTable";
import {ContentType} from "../../../enums/ContentType";
import {RpgDataInterface} from "../../../interfaces/data/RpgDataInterface";
import {AdventureInterface} from "../../../interfaces/data/AdventureInterface";

export class AdventureTableComponent extends AbstractComponent {
	public generateData(
		data: RpgDataInterface[],
		title:string|null,
	): ResponseElementInterface|null {
		if (data.length === 0){
			return null;
		}

		const response = new ResponseTable(this.app);
		response.addTitle(title ? title : 'Adventures');
		response.addHeaders([
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create('#', ContentType.String, true),
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create('Adventure', ContentType.String),
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create('Synopsis', ContentType.String),
		]);
		data.forEach((adventure: AdventureInterface) => {
			response.addContent([
				this.app.plugins.getPlugin('rpg-manager').factories.contents.create(adventure.adventureId, ContentType.Number, true),
				this.app.plugins.getPlugin('rpg-manager').factories.contents.create(adventure.link, ContentType.Link),
				this.app.plugins.getPlugin('rpg-manager').factories.contents.create(adventure.synopsis, ContentType.Markdown),
			])
		});

		return response;
	}
}
