import {ServiceClassInterface} from "./interfaces/ServiceClassInterface";
import {App} from "obsidian";
import {ServiceManagerInterface} from "./interfaces/ServiceManagerInterface";
import {ServiceInterface} from "./interfaces/ServiceInterface";

export class ServicesManager implements ServiceManagerInterface{
	private _services: Map<ServiceClassInterface<any>, ServiceInterface>
		= new Map<ServiceClassInterface<any>, ServiceInterface>();

	constructor(
		private _app: App,
	) {
	}

	public register<T extends ServiceInterface>(
		serviceClass: ServiceClassInterface<T>
	): void {
		const service: T = new serviceClass(this._app);

		this._services.set(serviceClass, service)
	}

	public get<T extends ServiceInterface>(
		service: ServiceClassInterface<T>
	): T|undefined {
		return this._services.get(service) as T;
	}
}
