import {AbstractService} from "../../managers/servicesManager/abstracts/AbstractService";
import {BreadcrumbServiceInterface} from "./interfaces/BreadcrumbServiceInterface";
import {ServiceInterface} from "../../managers/servicesManager/interfaces/ServiceInterface";
import {ModelInterface} from "../../managers/modelsManager/interfaces/ModelInterface";
import {RpgManagerApiInterface} from "../../api/interfaces/RpgManagerApiInterface";
import {BreadcrumbFactoryInterface} from "./interfaces/BreadcrumbFactoryInterface";
import {BreadcrumbFactory} from "./factories/BreadcrumbFactory";
import {BreadcrumbView} from "./views/BreadcrumbView";

export class BreadcrumbService extends AbstractService implements BreadcrumbServiceInterface, ServiceInterface {
	private _factory: BreadcrumbFactoryInterface;

	constructor(
		api: RpgManagerApiInterface,
	) {
		super(api);

		this._factory = new BreadcrumbFactory(this.api);
	}

	public render(
		model: ModelInterface,
		containerEl: HTMLElement
	): void {
		const view = new BreadcrumbView();
		view.render(containerEl, this._factory.create(model));
	}
}
