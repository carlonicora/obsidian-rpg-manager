import {ServiceClassInterface} from "./interfaces/ServiceClassInterface";
import {App} from "obsidian";
import {ServiceManagerInterface} from "./interfaces/ServiceManagerInterface";

export class ServicesManager implements ServiceManagerInterface{
	private _services: Map<any, any> = new Map<any, any>();
	constructor(
		private _app: App,
	) {
	}

	public register<T>(
		service: ServiceClassInterface<T>
	): void {
		this._services.set(service, new service(this._app))
	}

	public get<T>(
		service: ServiceClassInterface<T>
	): T|undefined {
		return this._services.get(service);
	}
}
