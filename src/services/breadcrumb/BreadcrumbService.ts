import {AbstractService} from "../../api/servicesManager/abstracts/AbstractService";
import {BreadcrumbServiceInterface} from "./interfaces/BreadcrumbServiceInterface";
import {ServiceInterface} from "../../api/servicesManager/interfaces/ServiceInterface";
import {App} from "obsidian";
import {ModelInterface} from "../../api/modelsManager/interfaces/ModelInterface";
import {RpgManagerApiInterface} from "../../api/interfaces/RpgManagerApiInterface";

export class BreadcrumbService extends AbstractService implements BreadcrumbServiceInterface, ServiceInterface {
	constructor(
		app: App,
		api: RpgManagerApiInterface,
	) {
		super(app, api);
	}

	public render(
		model: ModelInterface,
		containerEl: HTMLElement
	): void {

	}
}
