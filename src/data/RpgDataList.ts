import {RpgDataListInterface} from "../interfaces/data/RpgDataListInterface";
import {RpgDataInterface} from "../interfaces/data/RpgDataInterface";
import {App} from "obsidian";

export class RpgDataList implements RpgDataListInterface{
	public elements: RpgDataInterface[] = [];

	constructor(
		private app: App,
	) {
	}

	public where(
		predicate: any,
	): RpgDataListInterface {
		const response = new RpgDataList(this.app);

		(this.elements.filter(predicate) || []).forEach((data: RpgDataInterface) => {
			response.addElement(data);
		});

		return response;
	}

	public sort(
		comparatorFunction: any,
	): RpgDataListInterface {
		this.elements.sort(comparatorFunction);

		return this;
	}

	public getElement(
		path: string,
	): RpgDataInterface|null {
		let response = null;

		this.elements.forEach((element: RpgDataInterface) => {
			if (element.path === path){
				response = element;
			}
		});

		return response;
	}

	public removeElement(
		path: string
	): boolean {
		let index: number|undefined = undefined;
		for (let dataCounter=0; dataCounter<this.elements.length; dataCounter++){
			if (this.elements[dataCounter].path === path){
				index = dataCounter;
				break;
			}
		}

		if (index === undefined) return false;

		this.elements.splice(index, 1);
		return true;
	}

	public addElement(
		element: RpgDataInterface,
	): void {
		let isNew = true;

		for (let elementCount = 0; elementCount < this.elements.length; elementCount++) {
			if (this.elements[elementCount].path === element.path){
				this.elements[elementCount] = element;
				isNew = false;
			}
		}

		if (isNew) {
			this.elements.push(element);
		}
	}
}
