import {RpgManagerApiInterface} from "./interfaces/RpgManagerApiInterface";
import {App} from "obsidian";
import {ServiceManagerInterface} from "./servicesManager/interfaces/ServiceManagerInterface";
import {ServicesManager} from "./servicesManager/ServicesManager";
import {RpgManagerInterface} from "../interfaces/RpgManagerInterface";
import {SearchService} from "../services/search/SearchService";
import {FantasyCalendarService} from "../services/fantasyCalendar/FantasyCalendarService";
import {DateService} from "../services/date/DateService";

export class RpgManagerApi implements RpgManagerApiInterface {
	public static bootstrap(
		app: App,
		plugin: RpgManagerInterface,
	): RpgManagerApiInterface {
		const response = new RpgManagerApi(app, plugin);

		response.service.register(SearchService);

		if (app.plugins.enabledPlugins.has("fantasy-calendar"))
			response.service.register(FantasyCalendarService);

		response.service.register(DateService);

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
