import {DatabaseInterface} from "../interfaces/database/DatabaseInterface";
import {RecordInterface} from "../interfaces/database/RecordInterface";
import {App} from "obsidian";

export class Database implements DatabaseInterface {
	public elements: Array<RecordInterface> = [];

	constructor(
		private app: App,
	) {
	}

	public create(
		data: RecordInterface,
	): void {
		let isNew = true;

		for (let elementCount = 0; elementCount < this.elements.length; elementCount++) {
			if (this.elements[elementCount].path === data.path){
				this.elements[elementCount] = data;
				isNew = false;
			}
		}

		if (isNew) {
			this.elements.push(data);
		}
	}

	public read(
		query: any|undefined = undefined,
		comparison: any|undefined = undefined,
	): Array<RecordInterface> {
		const response = this.elements.filter((query !== null ? query : true));

		if (comparison !== undefined){
			this.internalSort(response, comparison);
		}

		return response;
	}

	public update(
		data: RecordInterface,
	): void {
		this.create(data);
	}

	public delete(
		data: RecordInterface|string,
	): boolean {
		const key = (typeof data === 'string') ? data : data.path;

		let index: number|undefined = undefined;
		for (let dataCounter=0; dataCounter<this.elements.length; dataCounter++){
			if (this.elements[dataCounter].path === key){
				index = dataCounter;
				break;
			}
		}

		if (index !== undefined) this.elements.splice(index, 1);

		return index !== undefined;
	}


	private internalSort(
		data: Array<RecordInterface>,
		comparison: any,
	): void {
	}
}


