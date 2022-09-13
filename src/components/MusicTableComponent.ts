import {AbstractComponent} from "../abstracts/AbstractComponent";
import {RpgDataInterface} from "../interfaces/data/RpgDataInterface";
import {ResponseElementInterface} from "../interfaces/response/ResponseElementInterface";
import {ResponseTable} from "../data/responses/ResponseTable";
import {ContentType} from "../enums/ContentType";
import {MusicInterface} from "../interfaces/data/MusicInterface";

export class MusicTableComponent extends AbstractComponent {
	generateData(
		data: RpgDataInterface[],
		title:string|null,
	): ResponseElementInterface | null {
		if (data.length === 0){
			return null;
		}

		const response = new ResponseTable(this.app);

		response.addTitle(title ? title : 'Music');
		response.addHeaders([
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create('Music', ContentType.String),
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create('url', ContentType.String),
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create('Synopsis', ContentType.String),
		]);
		data.forEach((music: MusicInterface) => {
			response.addContent([
				this.app.plugins.getPlugin('rpg-manager').factories.contents.create(music.link, ContentType.Link, true),
				this.app.plugins.getPlugin('rpg-manager').factories.contents.create((music.url ?? '<span class="rpgm-missing">No URL provided</span>'), ContentType.Markdown),
				this.app.plugins.getPlugin('rpg-manager').factories.contents.create(music.additionalInformation ?? music.synopsis, ContentType.Markdown),
			])
		});

		return response;
	}
}
