import {RpgManagerApiInterface} from "./interfaces/RpgManagerApiInterface";
import {App} from "obsidian";
import {ServiceManagerInterface} from "./servicesManager/interfaces/ServiceManagerInterface";
import {ServicesManager} from "./servicesManager/ServicesManager";
import {RpgManagerInterface} from "../core/interfaces/RpgManagerInterface";
import {SearchService} from "../services/search/SearchService";
import {FantasyCalendarService} from "../services/fantasyCalendar/FantasyCalendarService";
import {DateService} from "../services/date/DateService";
import {NewViewFactoryInterface} from "./factories/interfaces/NewViewFactoryInterface";
import {NewViewFactory} from "./factories/NewViewFactory";
import {ComponentManagerInterface} from "./componentManager/interfaces/ComponentManagerInterface";
import {ComponentManager} from "./componentManager/ComponentManager";
import {DatabaseInterface} from "../database/interfaces/DatabaseInterface";
import {NewModelFactoryInterface} from "./factories/interfaces/NewModelFactoryInterface";
import {NewModelFactory} from "./factories/NewModelFactory";

export class RpgManagerApi implements RpgManagerApiInterface {
	private _components: ComponentManagerInterface;
	private _database: DatabaseInterface;
	private _models: NewModelFactoryInterface;
	private _services: ServiceManagerInterface;
	private _views: NewViewFactoryInterface;

	constructor(
		private _app: App,
		private _plugin: RpgManagerInterface,
	) {
		this._components = new ComponentManager(this._app);
		this._models = new NewModelFactory(this._app);
		this._services = new ServicesManager(this._app);
		this._views = new NewViewFactory(this._app);
	}

	public get components(): ComponentManagerInterface {
		return this._components;
	}

	public get database(): DatabaseInterface {
		return this._database;
	}

	public set database(database: DatabaseInterface) {
		this._database = database;
	}

	public get models(): NewModelFactoryInterface {
		return this._models;
	}

	public get services(): ServiceManagerInterface {
		return this._services;
	}

	public get views(): NewViewFactoryInterface {
		return this._views;
	}
}
