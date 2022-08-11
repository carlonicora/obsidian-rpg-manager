import {RpgFunctions} from "../functions/RpgFunctions";
import {GenericDataInterface, GenericImageDataInterface} from "../interfaces/DataInterfaces";
import {CampaignDataInterface} from "../data/CampaignData";
import {Component, MarkdownRenderer} from "obsidian";

export abstract class AbstractData implements GenericDataInterface{
	public link: string;
	public name: string;
	public path: string;

	constructor(
		protected functions: RpgFunctions,
		protected data: Record<string, any>,
	) {
		this.link = data.file.link;
		this.name = data.file.name;
		this.path = data.file.path;
	}
}

export abstract class AbstractImageData extends AbstractData implements GenericImageDataInterface{
	public imageSrc: string|null;
	public image: string;

	constructor(
		functions: RpgFunctions,
		data: Record<string, any>,
	) {
		super(functions, data);

		this.imageSrc = functions.getImageLink(data);
		this.image = (this.imageSrc !== null ? functions.getImage(data) : '');
	}

	getImage(
		width = 75,
		height = 75,
	): string {
		if (this.imageSrc === null) return "";

		return this.functions.getImage(this.data, width, height);
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
