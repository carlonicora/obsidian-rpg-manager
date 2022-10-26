import {ResponseDataElementInterface} from "../../responses/interfaces/ResponseDataElementInterface";
import {SubModelInterface} from "../interfaces/SubModelInterface";
import {AbstractFactory} from "../../abstracts/AbstractFactory";
import {App} from "obsidian";
import {SubModelFactoryInterface} from "./interfaces/SubModelFactoryInterface";
import {ModelInterface} from "../../../src/api/modelsManager/interfaces/ModelInterface";
import {RelationshipInterface} from "../../../src/services/relationshipsService/interfaces/RelationshipInterface";

export class SubModelFactory extends AbstractFactory implements SubModelFactoryInterface{
	public async create<T extends SubModelInterface>(
		subModelType: (new (app: App, currentComponent: ModelInterface) => T),
		currentComponent: ModelInterface,
		data: RelationshipInterface|RelationshipInterface[],
		title: string|undefined=undefined,
		additionalInformation: any|undefined=undefined,
	): Promise<ResponseDataElementInterface|null> {
		const subModel: SubModelInterface = new subModelType(this.app, currentComponent);
		return subModel.generateData(data, title, additionalInformation);
	}
}
