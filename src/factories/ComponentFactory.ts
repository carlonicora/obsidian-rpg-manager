import {ResponseElementInterface} from "../interfaces/response/ResponseElementInterface";
import {ComponentInterface} from "../interfaces/ComponentInterface";
import {AbstractFactory} from "../abstracts/AbstractFactory";
import {RelationshipInterface} from "../interfaces/RelationshipInterface";
import {AbstractComponent} from "../abstracts/AbstractComponent";
import {App} from "obsidian";

export class ComponentFactory extends AbstractFactory {
	public async create<T extends AbstractComponent>(
		componentType: (new (app: App) => T),
		data: RelationshipInterface|RelationshipInterface[],
		title: string|undefined=undefined,
		additionalInformation: any|undefined=undefined,
	): Promise<ResponseElementInterface|null> {
		const component: ComponentInterface = new componentType(this.app);
		return component.generateData(data, title, additionalInformation);
	}
}
