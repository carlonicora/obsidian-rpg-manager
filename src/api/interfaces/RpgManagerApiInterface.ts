import {ModelsManagerInterface} from "../modelsManager/interfaces/ModelsManagerInterface";
import {ViewsManagerInterface} from "../viewsManager/interfaces/ViewsManagerInterface";
import {ComponentsManagerInterface} from "../componentsManager/interfaces/ComponentsManagerInterface";
import {DatabaseInterface} from "../../database/interfaces/DatabaseInterface";
import {ControllerManagerInterface} from "../controllerManager/interfaces/ControllerManagerInterface";
import {RpgManagerSettingsInterface} from "../../settings/RpgManagerSettingsInterface";
import {ServiceInterface} from "../servicesManager/interfaces/ServiceInterface";
import {ServiceClassInterface} from "../servicesManager/interfaces/ServiceClassInterface";

export interface RpgManagerApiInterface {
	get controllers(): ControllerManagerInterface;
	get components(): ComponentsManagerInterface;
	get database(): DatabaseInterface;
	set database(database: DatabaseInterface);
	get models(): ModelsManagerInterface;

	get settings(): RpgManagerSettingsInterface;
	get views(): ViewsManagerInterface;

	bootstrap(
	): void;

	service<T extends ServiceInterface>(service: ServiceClassInterface<T>): T;
}
