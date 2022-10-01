import {ResponseDataElementInterface} from "../interfaces/response/ResponseDataElementInterface";
import {SubModelInterface} from "../interfaces/SubModelInterface";
import {AbstractFactory} from "../abstracts/AbstractFactory";
import {App} from "obsidian";
import {SubModelFactoryInterface} from "../interfaces/factories/SubModelFactoryInterface";
import {ComponentV2Interface} from "../_dbV2/interfaces/ComponentV2Interface";
import {RelationshipV2Interface} from "../_dbV2/relationships/interfaces/RelationshipV2Interface";

export class SubModelFactory extends AbstractFactory implements SubModelFactoryInterface{
	public async create<T extends SubModelInterface>(
		subModelType: (new (app: App, currentElement: ComponentV2Interface) => T),
		currentElement: ComponentV2Interface,
		data: RelationshipV2Interface|RelationshipV2Interface[],
		title: string|undefined=undefined,
		additionalInformation: any|undefined=undefined,
	): Promise<ResponseDataElementInterface|null> {
		const subModel: SubModelInterface = new subModelType(this.app, currentElement);
		return subModel.generateData(data, title, additionalInformation);
	}
}
