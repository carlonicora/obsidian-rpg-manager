import {ResponseDataElementInterface} from "../interfaces/response/ResponseDataElementInterface";
import {SubModelInterface} from "../interfaces/SubModelInterface";
import {AbstractFactory} from "../abstracts/AbstractFactory";
import {RelationshipInterface} from "../interfaces/RelationshipInterface";
import {App} from "obsidian";
import {SubModelFactoryInterface} from "../interfaces/factories/SubModelFactoryInterface";
import {ComponentV2Interface} from "../_dbV2/interfaces/ComponentV2Interface";

export class SubModelFactory extends AbstractFactory implements SubModelFactoryInterface{
	public async create<T extends SubModelInterface>(
		subModelType: (new (app: App, currentElement: ComponentV2Interface) => T),
		currentElement: ComponentV2Interface,
		data: RelationshipInterface|RelationshipInterface[],
		title: string|undefined=undefined,
		additionalInformation: any|undefined=undefined,
	): Promise<ResponseDataElementInterface|null> {
		const subModel: SubModelInterface = new subModelType(this.app, currentElement);
		return subModel.generateData(data, title, additionalInformation);
	}
}
