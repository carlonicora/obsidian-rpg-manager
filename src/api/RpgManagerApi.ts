import {RpgManagerApiInterface} from "./interfaces/RpgManagerApiInterface";
import {App, FileSystemAdapter, TFile} from "obsidian";
import {ServiceManagerInterface} from "../managers/servicesManager/interfaces/ServiceManagerInterface";
import {ServicesManager} from "../managers/servicesManager/ServicesManager";
import {RpgManagerInterface} from "../core/interfaces/RpgManagerInterface";
import {ViewsManagerInterface} from "../managers/viewsManager/interfaces/ViewsManagerInterface";
import {ViewsManager} from "../managers/viewsManager/ViewsManager";
import {ComponentsManagerInterface} from "../managers/componentsManager/interfaces/ComponentsManagerInterface";
import {ComponentsManager} from "../managers/componentsManager/ComponentsManager";
import {DatabaseInterface} from "../managers/databaseManager/interfaces/DatabaseInterface";
import {ModelsManagerInterface} from "../managers/modelsManager/interfaces/ModelsManagerInterface";
import {ModelsManager} from "../managers/modelsManager/ModelsManager";
import {ControllerManagerInterface} from "../managers/controllerManager/interfaces/ControllerManagerInterface";
import {ControllerManager} from "../managers/controllerManager/ControllerManager";
import {RpgManagerSettingsInterface} from "../settings/interfaces/RpgManagerSettingsInterface";
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
import {DatabaseManagerInterface} from "../managers/databaseManager/interfaces/DatabaseManagerInterface";
import {DatabaseManager} from "../managers/databaseManager/DatabaseManager";
import {LoggerService} from "../services/loggerService/LoggerService";
import {LogMessageType} from "../services/loggerService/enums/LogMessageType";
import i18next from "i18next";
import Backend from 'i18next-fs-backend';

export class RpgManagerApi implements RpgManagerApiInterface {
	private _controllers: ControllerManagerInterface;
	private _components: ComponentsManagerInterface;
	private _database: DatabaseManagerInterface;
	private _fetchers: FetchersManagerInterface;
	private _modals: ModalsManagerInterface;
	private _models: ModelsManagerInterface;
	private _root: string;
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
		this._database = new DatabaseManager(this);
		this._fetchers = new FetchersManager(this);
		this._modals = new ModalsManager(this);
		this._models = new ModelsManager(this);
		this._services = new ServicesManager(this);
		this._staticViews = new StaticViewsManager(this);
		this._templates = new TemplatesManager(this);
		this._views = new ViewsManager(this);

		const file = this.app.vault.getAbstractFileByPath('/');
		this._root = this. app.vault.getResourcePath(file as TFile);
		if (this._root.includes("?"))
			this._root = this._root.substring(0, this._root.lastIndexOf("?"));

		if (!this._root.endsWith("/"))
			this._root += "/";

		this._initialiseI18N();

	}

	private async _initialiseI18N(
	): Promise<void> {
		let basePath: string|undefined =  undefined;

		if (this.app.vault.adapter instanceof FileSystemAdapter)
			basePath = this.app.vault.adapter.getBasePath();
		else
			basePath = this._root;

		if (basePath !== undefined) {
			await i18next
				.use(Backend)
				.init({
					initImmediate: false,
					saveMissing: true,
					fallbackLng: 'en',
					lng: this.language,
					debug: true,
					ns: ['common', 'elements', 'errors'],
					defaultNS: 'common',
					backend: {
						loadPath: basePath + `/${this.app.vault.configDir}/plugins/rpg-manager/locales/{{lng}}/{{ns}}.json`,
					}
				});

			i18next.on('missingKey', function(lngs, namespace, key, res) {
				console.error('Translation missing of key ' + key + ' for language ' + lngs + ' in ' + namespace);
			});
		}
	}

	public get language(): string {
		return window.localStorage.getItem('language') ?? 'en';
		// return 'it';
	}

	public get controllers(): ControllerManagerInterface {
		return this._controllers;
	}

	public get components(): ComponentsManagerInterface {
		return this._components;
	}

	public get database(): DatabaseInterface {
		return this._database.database;
	}

	public set database(database: DatabaseInterface) {
		this._database.database = database;
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

	public get root(): string {
		return this._root;
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

	public createDatabase(
	): DatabaseInterface {
		return this._database.createDatabase();
	}

	public fetcher<T extends FetcherInterface>(
		fetcher: ClassInterface<T>,
	): T {
		const response = this._fetchers.get(fetcher);

		if (response === undefined) {
			this.service(LoggerService).createError(LogMessageType.System, i18next.t('non_existing', {context: 'fetcher', name: fetcher.name, ns: 'errors'}));
			throw new Error(i18next.t('non_existing', {context: 'fetcher', name: fetcher.name, ns: 'errors'}) ?? '');
		}

		return response;
	}

	public service<T extends ServiceInterface>(
		service: ClassInterface<T>,
	): T {
		const response = this._services.get(service);

		if (response === undefined) {
			this.service(LoggerService).createError(LogMessageType.System, i18next.t('non_existing', {context: 'service', name: service.name, ns: 'errors'}));
			throw new Error(i18next.t('non_existing', {context: 'service', name: service.name, ns: 'errors'}) ?? '');
		}

		return response;
	}
}
