import {RpgManagerApiInterface} from "./interfaces/RpgManagerApiInterface";
import {App} from "obsidian";
import {ServiceManagerInterface} from "./servicesManager/interfaces/ServiceManagerInterface";
import {ServicesManager} from "./servicesManager/ServicesManager";
import {RpgManagerInterface} from "../interfaces/RpgManagerInterface";

export class RpgManagerApi implements RpgManagerApiInterface {
	public static bootstrap(
		app: App,
		plugin: RpgManagerInterface,
	): RpgManagerApiInterface {
		const response = new RpgManagerApi(app, plugin);

		return response;
	}

	private _services: ServiceManagerInterface;

	constructor(
		private _app: App,
		private _plugin: RpgManagerInterface,
	) {
		this._services = new ServicesManager(_app);
	}

	public get service(
	): ServiceManagerInterface {
		return this._services;
	}
}
