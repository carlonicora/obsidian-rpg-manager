import {RpgDataInterface} from "../interfaces/data/RpgDataInterface";
import {App, CachedMetadata, FrontMatterCache, LinkCache, TFile} from "obsidian";
import {DataType} from "../enums/DataType";

export abstract class AbstractRpgData implements RpgDataInterface {
	public obsidianId: string;

	public link: string;
	public name: string;
	public path: string;

	public links: Array<string>;

	public completed: boolean;
	public synopsis: string|null = null;
	public additionalInformation: string|null = null;
	public image: string|null = null;

	public frontmatter: FrontMatterCache|undefined;

	constructor(
		protected app: App,
		public type: DataType,
		file: TFile,
		metadata: CachedMetadata,
	) {
		this.reload(file, metadata);
	}

	public reload(
		file: TFile,
		metadata: CachedMetadata,
	) {
		this.obsidianId = file.path;

		this.link = '[[' + file.basename + ']]';
		this.name = file.basename;
		this.path = file.path;

		this.links = [];

		(metadata.links || []).forEach((link: LinkCache) => {
			this.links.push(link.link);
		});

		this.frontmatter = metadata.frontmatter;

		this.completed = metadata.frontmatter?.completed ? metadata.frontmatter?.completed : true;
		this.synopsis = metadata.frontmatter?.synopsis;
		this.image = this.app.plugins.getPlugin('rpg-manager').functions.getImg(this.name);
	}

	public get imageSrcElement(
	): HTMLElement|null {
		if (this.image == null) return null;

		return this.app.plugins.getPlugin('rpg-manager').functions.getImgElement(this.image);
	}


	public getRelationships(
		type: DataType
	): RpgDataInterface[] {
		const response: RpgDataInterface[] = [];

		const relationships: any = this.frontmatter?.relationships[DataType[type].toLowerCase() + 's'];
		if (relationships != null){
			Object.entries(relationships).forEach(([key, value], index) => {
				const data = this.app.plugins.getPlugin('rpg-manager').io.getElementByName(key);
				if (data != null){
					data.additionalInformation = <string>value;
					response.push(data);
				}
			});
		}

		return response;
	}

	protected initialiseDate(
		date: string|null,
	): Date|null {
		return date ? new Date(date) : null;
	}
}
