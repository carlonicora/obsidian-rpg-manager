import {GenericDataInterface} from "../interfaces/data/GenericDataInterface";
import {DateTime} from "obsidian-dataview";

export abstract class AbstractData implements GenericDataInterface {
	public link: string;
	public name: string;
	public path: string;
	public completed: boolean;

	constructor(
		protected data: Record<string, any>,
	) {
		this.link = data.file.link;
		this.name = data.file.name;
		this.path = data.file.path;
		this.completed = (data.completed != null) ? data.completed : true;
	}
}
