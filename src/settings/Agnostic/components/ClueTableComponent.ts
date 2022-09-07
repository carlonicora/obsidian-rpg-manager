import {AbstractComponent} from "../../../abstracts/AbstractComponent";
import {ResponseElementInterface} from "../../../interfaces/response/ResponseElementInterface";
import {ResponseTable} from "../../../data/responses/ResponseTable";
import {ContentFactory} from "../../../factories/ContentFactory";
import {ContentType} from "../../../enums/ContentType";
import {RpgDataInterface} from "../../../interfaces/data/RpgDataInterface";
import {ClueInterface} from "../../../interfaces/data/ClueInterface";

export class ClueTableComponent extends AbstractComponent {
	generateData(
		data: RpgDataInterface[],
		title:string|null,
	): ResponseElementInterface | null {
		if (data.length === 0){
			return null;
		}

		const response = new ResponseTable(this.app);

		response.addTitle(title ? title : 'Clues');
		response.addHeaders([
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create('', ContentType.String, true),
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create('Clue', ContentType.String),
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create('Found', ContentType.String),
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create('Synopsis', ContentType.String),
		]);
		data.forEach((clue: ClueInterface) => {
			response.addContent([
				this.app.plugins.getPlugin('rpg-manager').factories.contents.create(clue.imageSrcElement, ContentType.Image, true),
				this.app.plugins.getPlugin('rpg-manager').factories.contents.create(clue.link, ContentType.Link, true),
				this.app.plugins.getPlugin('rpg-manager').factories.contents.create((clue.isFound ? clue.found?.toDateString() : '<span class="rpgm-missing">no</span>'), ContentType.Markdown),
				this.app.plugins.getPlugin('rpg-manager').factories.contents.create(clue.additionalInformation ?? clue.synopsis, ContentType.Markdown),
			])
		});

		return response;
	}
}
