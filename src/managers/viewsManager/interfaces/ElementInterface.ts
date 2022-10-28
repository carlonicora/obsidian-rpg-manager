import {ElementDataInterface} from "./ElementDataInterface";

export interface ElementInterface{
	render(
		data: ElementDataInterface,
		containerEl: HTMLElement,
	): void;
}
