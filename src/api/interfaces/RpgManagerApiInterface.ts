import {ServiceManagerInterface} from "../servicesManager/interfaces/ServiceManagerInterface";
import {ModelsManagerInterface} from "../modelsManager/interfaces/ModelsManagerInterface";
import {ViewsManagerInterface} from "../viewsManager/interfaces/ViewsManagerInterface";
import {ComponentsManagerInterface} from "../componentsManager/interfaces/ComponentsManagerInterface";
import {DatabaseInterface} from "../../database/interfaces/DatabaseInterface";
import {ControllerManagerInterface} from "../controllerManager/interfaces/ControllerManagerInterface";

export interface RpgManagerApiInterface {
	get controllers(): ControllerManagerInterface;
	get components(): ComponentsManagerInterface;
	get database(): DatabaseInterface;
	set database(database: DatabaseInterface);
	get models(): ModelsManagerInterface;
	get services(): ServiceManagerInterface;
	get views(): ViewsManagerInterface;

	bootstrap(
	): void;
}
