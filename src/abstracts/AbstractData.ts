import {Api} from "../Api";
import {CampaignDataInterface} from "../interfaces/data/CampaignDataInterface";
import {GenericDataInterface} from "../interfaces/data/GenericDataInterface";
import {GenericImageDataInterface} from "../interfaces/data/GenericImageDataInterface";

export abstract class AbstractData implements GenericDataInterface {
	public link: string;
	public name: string;
	public path: string;
	public completed: boolean;

	constructor(
		protected api: Api,
		protected data: Record<string, any>,
	) {
		this.link = data.file.link;
		this.name = data.file.name;
		this.path = data.file.path;
		this.completed = (data.completed != null) ? data.completed : true;
	}
}

export abstract class AbstractImageData extends AbstractData implements GenericImageDataInterface {
	public imageSrc: string|null;
	public image: string;
	public imageSrcElement: HTMLImageElement|null;

	constructor(
		api: Api,
		data: Record<string, any>,
	) {
		super(api, data);

		this.imageSrc = api.getImageLink(data);
		this.imageSrcElement = api.getImageElement(data);
		this.image = (this.imageSrc !== null ? api.getImage(data) : '');
	}

	getImage(
		width = 75,
		height = 75,
	): string {
		if (this.imageSrc === null) return "";

		return this.api.getImage(this.data, width, height);
	}
}

export abstract class AbstractDataList{
	public elements: GenericDataInterface[];

	constructor(
		public campaign: CampaignDataInterface|null,
	) {
	}

	public add(
		data: GenericDataInterface
	): void {
		this.elements.push(data);
	}

	public map(
		data: GenericDataInterface,
	): Map<string, any> {
		const response = new Map();
		const character: GenericDataInterface|undefined = this.elements.find(t=>t.link === data.link);

		if (character !== undefined) {
			Object.entries(character).forEach(([key, value]) => {
				response.set(key, value);
			});
		}

		return response;
	}
}
