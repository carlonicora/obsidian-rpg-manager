import {ServiceManagerInterface} from "./interfaces/ServiceManagerInterface";
import {ServiceInterface} from "./interfaces/ServiceInterface";
import {RpgManagerApiInterface} from "../../api/interfaces/RpgManagerApiInterface";
import {ClassInterface} from "../../api/interfaces/ClassInterface";

export class ServicesManager implements ServiceManagerInterface{
	private _services: Map<ClassInterface<any>, ServiceInterface>
		= new Map<ClassInterface<any>, ServiceInterface>();

	constructor(
		private _api: RpgManagerApiInterface,
	) {
	}

	public get<T extends ServiceInterface>(
		service: ClassInterface<T>
	): T|undefined {
		return this._services.get(service) as T;
	}

	public register<T extends ServiceInterface>(
		serviceClass: ClassInterface<T>
	): void {
		this._services.set(serviceClass, new serviceClass(this._api));
	}
}
