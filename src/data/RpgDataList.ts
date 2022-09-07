import {RpgDataListInterface} from "../interfaces/data/RpgDataListInterface";
import {RpgDataInterface} from "../interfaces/data/RpgDataInterface";
import {RpgOutlineDataInterface} from "../interfaces/data/RpgOutlineDataInterface";

export class RpgDataList implements RpgDataListInterface{
	public elements: RpgDataInterface[] = [];

	public where(
		predicate: any,
	): RpgDataInterface[]|RpgOutlineDataInterface[] {
		return this.elements.filter(predicate);
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
				this.elements[elementCount] = element;
				isNew = false;
			}
		}

		if (isNew) {
			this.elements.push(element);
		}
	}
}
