import {ModelsManagerInterface} from "../modelsManager/interfaces/ModelsManagerInterface";
import {ViewsManagerInterface} from "../viewsManager/interfaces/ViewsManagerInterface";
import {ComponentsManagerInterface} from "../componentsManager/interfaces/ComponentsManagerInterface";
import {DatabaseInterface} from "../../database/interfaces/DatabaseInterface";
import {ControllerManagerInterface} from "../controllerManager/interfaces/ControllerManagerInterface";
import {RpgManagerSettingsInterface} from "../../settings/RpgManagerSettingsInterface";
import {ServiceInterface} from "../servicesManager/interfaces/ServiceInterface";
import {App} from "obsidian";
import {RpgManagerInterface} from "../../core/interfaces/RpgManagerInterface";
import {ClassInterface} from "./ClassInterface";
import {ModalsManagerInterface} from "../modalsManager/interfaces/ModalsManagerInterface";
import {TemplatesManagerInterface} from "../templatesManager/interfaces/TemplatesManagerInterface";

export interface RpgManagerApiInterface {
	app: App;

	get controllers(): ControllerManagerInterface;
	get components(): ComponentsManagerInterface;
	get database(): DatabaseInterface;
	set database(database: DatabaseInterface);
	get modals(): ModalsManagerInterface;
	get models(): ModelsManagerInterface;
	get plugin(): RpgManagerInterface;
	get settings(): RpgManagerSettingsInterface;
	get templates(): TemplatesManagerInterface;
	get views(): ViewsManagerInterface;

	bootstrap(
	): void;

	service<T extends ServiceInterface>(service: ClassInterface<T>): T;
}
