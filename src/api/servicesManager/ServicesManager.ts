import {ServiceClassInterface} from "./interfaces/ServiceClassInterface";
import {ServiceManagerInterface} from "./interfaces/ServiceManagerInterface";
import {ServiceInterface} from "./interfaces/ServiceInterface";
import {RpgManagerApiInterface} from "../interfaces/RpgManagerApiInterface";

export class ServicesManager implements ServiceManagerInterface{
	private _services: Map<ServiceClassInterface<any>, ServiceInterface>
		= new Map<ServiceClassInterface<any>, ServiceInterface>();

	constructor(
		private _api: RpgManagerApiInterface,
	) {
	}

	public get<T extends ServiceInterface>(
		service: ServiceClassInterface<T>
	): T|undefined {
		return this._services.get(service) as T;
	}

	public register<T extends ServiceInterface>(
		serviceClass: ServiceClassInterface<T>
	): void {
		this._services.set(serviceClass, new serviceClass(this._api));
	}
}
