import {ResponseDataElementInterface} from "../../../responses/interfaces/ResponseDataElementInterface";
import {SubModelInterface} from "../interfaces/SubModelInterface";
import {AbstractFactory} from "../../../core/abstracts/AbstractFactory";
import {App} from "obsidian";
import {SubModelFactoryInterface} from "./interfaces/SubModelFactoryInterface";
import {ComponentModelInterface} from "../../../api/componentManager/interfaces/ComponentModelInterface";
import {RelationshipInterface} from "../../../services/relationships/interfaces/RelationshipInterface";

export class SubModelFactory extends AbstractFactory implements SubModelFactoryInterface{
	public async create<T extends SubModelInterface>(
		subModelType: (new (app: App, currentComponent: ComponentModelInterface) => T),
		currentComponent: ComponentModelInterface,
		data: RelationshipInterface|RelationshipInterface[],
		title: string|undefined=undefined,
		additionalInformation: any|undefined=undefined,
	): Promise<ResponseDataElementInterface|null> {
		const subModel: SubModelInterface = new subModelType(this.app, currentComponent);
		return subModel.generateData(data, title, additionalInformation);
	}
}
