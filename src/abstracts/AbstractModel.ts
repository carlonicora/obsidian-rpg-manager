import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {ModelInterface} from "../interfaces/ModelInterface";
import {App} from "obsidian";
import {RecordInterface} from "../interfaces/database/RecordInterface";
import {ComponentFactory} from "../factories/ComponentFactory";
import {ResponseData} from "../data/responses/ResponseData";
import {AbstractRpgManager} from "./AbstractRpgManager";

export abstract class AbstractModel extends AbstractRpgManager implements ModelInterface {
	protected componentFactory: ComponentFactory;
	protected response:ResponseDataInterface;

	constructor(
		app: App,
		protected currentElement: RecordInterface,
		protected source: string,
		protected sourcePath: string,
		protected sourceMeta: any,
	) {
		super(app);
		this.response = new ResponseData(this.app);
	}

	abstract generateData(
	): Promise<ResponseDataInterface>;
}
