import {RpgDataListInterface} from "../interfaces/data/RpgDataListInterface";
import {RpgDataInterface} from "../interfaces/data/RpgDataInterface";
import {AbstractRpgOutlineData} from "../abstracts/AbstractRpgOutlineData";
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
		obsidianId: string,
	): RpgDataInterface|null {
		let response = null;

		this.elements.forEach((element: RpgDataInterface) => {
			if (element.obsidianId === obsidianId){
				response = element;
			}
		});

		return response;
	}

	public addElement(
		element: RpgDataInterface,
	): void {
		let isNew = true;

		for (let elementCount = 0; elementCount < this.elements.length; elementCount++) {
			if (this.elements[elementCount].obsidianId === element.obsidianId){
				if (element instanceof AbstractRpgOutlineData){
					element.initialiseNeighbours();
				}
				this.elements[elementCount] = element;
				isNew = false;
			}
		}

		if (isNew) {
			this.elements.push(element);
		}
	}
}
