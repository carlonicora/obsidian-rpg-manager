import {ModelsManagerInterface} from "../../managers/modelsManager/interfaces/ModelsManagerInterface";
import {ViewsManagerInterface} from "../../managers/viewsManager/interfaces/ViewsManagerInterface";
import {ComponentsManagerInterface} from "../../managers/componentsManager/interfaces/ComponentsManagerInterface";
import {DatabaseInterface} from "../../managers/databaseManager/interfaces/DatabaseInterface";
import {ControllerManagerInterface} from "../../managers/controllerManager/interfaces/ControllerManagerInterface";
import {RpgManagerSettingsInterface} from "../../settings/RpgManagerSettingsInterface";
import {ServiceInterface} from "../../managers/servicesManager/interfaces/ServiceInterface";
import {App} from "obsidian";
import {RpgManagerInterface} from "../../core/interfaces/RpgManagerInterface";
import {ClassInterface} from "./ClassInterface";
import {ModalsManagerInterface} from "../../managers/modalsManager/interfaces/ModalsManagerInterface";
import {TemplatesManagerInterface} from "../../managers/templatesManager/interfaces/TemplatesManagerInterface";
import {ServiceManagerInterface} from "../../managers/servicesManager/interfaces/ServiceManagerInterface";
import {FetchersManagerInterface} from "../../managers/fetchersManager/interfaces/FetchersManagerInterface";
import {FetcherInterface} from "../../managers/fetchersManager/interfaces/FetcherInterface";
import {StaticViewsManagerInterface} from "../../managers/staticViewsManager/interfaces/StaticViewsManagerInterface";

export interface RpgManagerApiInterface {
	app: App;

	get controllers(): ControllerManagerInterface;
	get components(): ComponentsManagerInterface;
	get database(): DatabaseInterface;
	set database(database: DatabaseInterface);
	get fetchers(): FetchersManagerInterface;
	get modals(): ModalsManagerInterface;
	get models(): ModelsManagerInterface;
	get plugin(): RpgManagerInterface;
	get root(): string;
	get services(): ServiceManagerInterface;
	get settings(): RpgManagerSettingsInterface;
	get staticViews(): StaticViewsManagerInterface;
	get templates(): TemplatesManagerInterface;
	get views(): ViewsManagerInterface;
	get version(): string;

	bootstrap(
	): void;

	fetcher<T extends FetcherInterface>(fetcher: ClassInterface<T>): T;
	service<T extends ServiceInterface>(service: ClassInterface<T>): T;
}
