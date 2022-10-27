import {RpgManagerApiInterface} from "./interfaces/RpgManagerApiInterface";
import {App} from "obsidian";
import {ServiceManagerInterface} from "../managers/servicesManager/interfaces/ServiceManagerInterface";
import {ServicesManager} from "../managers/servicesManager/ServicesManager";
import {RpgManagerInterface} from "../core/interfaces/RpgManagerInterface";
import {ViewsManagerInterface} from "../managers/viewsManager/interfaces/ViewsManagerInterface";
import {ViewsManager} from "../managers/viewsManager/ViewsManager";
import {ComponentsManagerInterface} from "../managers/componentsManager/interfaces/ComponentsManagerInterface";
import {ComponentsManager} from "../managers/componentsManager/ComponentsManager";
import {DatabaseInterface} from "../database/interfaces/DatabaseInterface";
import {ModelsManagerInterface} from "../managers/modelsManager/interfaces/ModelsManagerInterface";
import {ModelsManager} from "../managers/modelsManager/ModelsManager";
import {ControllerManagerInterface} from "../managers/controllerManager/interfaces/ControllerManagerInterface";
import {ControllerManager} from "../managers/controllerManager/ControllerManager";
import {RpgManagerSettingsInterface} from "../settings/RpgManagerSettingsInterface";
import {ServiceInterface} from "../managers/servicesManager/interfaces/ServiceInterface";
import {ClassInterface} from "./interfaces/ClassInterface";
import {ModalsManagerInterface} from "../managers/modalsManager/interfaces/ModalsManagerInterface";
import {TemplatesManagerInterface} from "../managers/templatesManager/interfaces/TemplatesManagerInterface";
import {ModalsManager} from "../managers/modalsManager/ModalsManager";
import {TemplatesManager} from "../managers/templatesManager/TemplatesManager";
import {Bootstrapper} from "./Bootstrapper";
import {FetchersManagerInterface} from "../managers/fetchersManager/interfaces/FetchersManagerInterface";
import {FetchersManager} from "../managers/fetchersManager/FetchersManager";
import {FetcherInterface} from "../managers/fetchersManager/interfaces/FetcherInterface";
import {StaticViewsManagerInterface} from "../managers/staticViewsManager/interfaces/StaticViewsManagerInterface";
import {StaticViewsManager} from "../managers/staticViewsManager/StaticViewsManager";

export class RpgManagerApi implements RpgManagerApiInterface {
	private _controllers: ControllerManagerInterface;
	private _components: ComponentsManagerInterface;
	private _database: DatabaseInterface;
	private _fetchers: FetchersManagerInterface;
	private _modals: ModalsManagerInterface;
	private _models: ModelsManagerInterface;
	private _services: ServiceManagerInterface;
	private _staticViews: StaticViewsManagerInterface;
	private _templates: TemplatesManagerInterface;
	private _views: ViewsManagerInterface;
	private _version: string;

	constructor(
		public app: App,
		private _plugin: RpgManagerInterface,
	) {
		this._version = this._plugin.version;

		this._controllers = new ControllerManager(this);
		this._components = new ComponentsManager(this);
		this._fetchers = new FetchersManager(this);
		this._modals = new ModalsManager(this);
		this._models = new ModelsManager(this);
		this._services = new ServicesManager(this);
		this._staticViews = new StaticViewsManager(this);
		this._templates = new TemplatesManager(this);
		this._views = new ViewsManager(this);
	}

	public get controllers(): ControllerManagerInterface {
		return this._controllers;
	}

	public get components(): ComponentsManagerInterface {
		return this._components;
	}

	public get database(): DatabaseInterface {
		return this._database;
	}

	public set database(database: DatabaseInterface) {
		this._database = database;
	}

	public get fetchers(): FetchersManagerInterface {
		return this._fetchers;
	}

	public get modals(): ModalsManagerInterface {
		return this._modals;
	}

	public get models(): ModelsManagerInterface {
		return this._models;
	}

	public get plugin(): RpgManagerInterface {
		return this._plugin;
	}

	public get services(): ServiceManagerInterface {
		return this._services;
	}

	public get settings(): RpgManagerSettingsInterface {
		return this._plugin.settings;
	}

	public get staticViews(): StaticViewsManagerInterface {
		return this._staticViews;
	}

	public get templates(): TemplatesManagerInterface {
		return this._templates;
	}

	public get views(): ViewsManagerInterface {
		return this._views;
	}

	public get version(): string {
		return this._version;
	}
	
	public bootstrap(
	): void {
		Bootstrapper.initialise(this);
	}

	public fetcher<T extends FetcherInterface>(
		fetcher: ClassInterface<T>,
	): T {
		const response = this._fetchers.get(fetcher);

		//TODO change the empty error
		if (response === undefined)
			throw new Error('');

		return response;
	}

	public service<T extends ServiceInterface>(
		service: ClassInterface<T>,
	): T {
		const response = this._services.get(service);

		//TODO change the empty error
		if (response === undefined)
			throw new Error('');

		return response;
	}
}
