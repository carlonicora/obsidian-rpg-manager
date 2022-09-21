import {ResponseElementInterface} from "../interfaces/response/ResponseElementInterface";
import {ComponentInterface} from "../interfaces/ComponentInterface";
import {AbstractFactory} from "../abstracts/AbstractFactory";
import {RelationshipInterface} from "../interfaces/RelationshipInterface";
import {App} from "obsidian";
import {ComponentFactoryInterface} from "../interfaces/factories/ComponentFactoryInterface";

export class ComponentFactory extends AbstractFactory implements ComponentFactoryInterface{
	public async create<T extends ComponentInterface>(
		componentType: (new (app: App) => T),
		data: RelationshipInterface|RelationshipInterface[],
		title: string|undefined=undefined,
		additionalInformation: any|undefined=undefined,
	): Promise<ResponseElementInterface|null> {
		const component: ComponentInterface = new componentType(this.app);
		return component.generateData(data, title, additionalInformation);
	}
}
