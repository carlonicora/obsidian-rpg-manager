import {AbstractComponent} from "../abstracts/AbstractComponent";
import {RecordInterface} from "../interfaces/database/RecordInterface";
import {ResponseElementInterface} from "../interfaces/response/ResponseElementInterface";
import {ResponseTable} from "../data/responses/ResponseTable";
import {ContentType} from "../enums/ContentType";
import {MusicInterface} from "../interfaces/data/MusicInterface";
import {RelationshipInterface} from "../interfaces/RelationshipInterface";

export class MusicTableComponent extends AbstractComponent {
	public async generateData(
		relationships: RelationshipInterface[],
		title:string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseElementInterface|null> {
		if (relationships.length === 0) return null;

		const response = new ResponseTable(this.app);

		response.addTitle(title ? title : 'Music');
		response.addHeaders([
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create('', ContentType.String, true),
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create('Music', ContentType.String),
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create('url', ContentType.String),
			this.app.plugins.getPlugin('rpg-manager').factories.contents.create('Synopsis', ContentType.String),
		]);
		for (let musicCounter=0; musicCounter < relationships.length; musicCounter++){
			const record: MusicInterface|undefined = relationships[musicCounter].component as MusicInterface;

			if (record !== undefined) {
				response.addContent([
					this.app.plugins.getPlugin('rpg-manager').factories.contents.create(await record.getDynamicImageSrcElement(), ContentType.Image, true),
					this.app.plugins.getPlugin('rpg-manager').factories.contents.create(record.link, ContentType.Link, true),
					this.app.plugins.getPlugin('rpg-manager').factories.contents.create((record.url ?? '<span class="rpgm-missing">No URL provided</span>'), ContentType.Markdown),
					this.app.plugins.getPlugin('rpg-manager').factories.contents.create(relationships[musicCounter].description !== '' ? relationships[musicCounter].description : record.synopsis, ContentType.Markdown),
				]);
			}
		}

		return response;
	}

	/*
	public copyToClipboard(data: string): void {
		const listener = (e: ClipboardEvent) => {
			if (e.clipboardData != null) {
				e.clipboardData.setData('text/plain', data);
			}
		};
	}
	*/
}
