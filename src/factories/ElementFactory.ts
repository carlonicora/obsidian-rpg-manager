import { App } from "obsidian";
import { RpgManagerElement } from "src/data/RpgManagerElement";
import { Element } from "src/interfaces/Element";
import { ElementData } from "src/interfaces/ElementData";
import { RPGManager } from "src/interfaces/RPGManager";

export class ElementFactory {
	static create(data: ElementData, app: App, api: RPGManager): Element {
		return new RpgManagerElement(data, app, api);
	}
}
