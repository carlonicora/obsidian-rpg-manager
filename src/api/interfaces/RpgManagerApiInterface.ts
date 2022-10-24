import {ServiceManagerInterface} from "../servicesManager/interfaces/ServiceManagerInterface";
import {NewModelFactoryInterface} from "../factories/interfaces/NewModelFactoryInterface";
import {NewViewFactoryInterface} from "../factories/interfaces/NewViewFactoryInterface";
import {ComponentManagerInterface} from "../componentManager/interfaces/ComponentManagerInterface";
import {DatabaseInterface} from "../../database/interfaces/DatabaseInterface";

export interface RpgManagerApiInterface {
	get components(): ComponentManagerInterface;
	get database(): DatabaseInterface;
	set database(database: DatabaseInterface);
	get models(): NewModelFactoryInterface;
	get services(): ServiceManagerInterface;
	get views(): NewViewFactoryInterface;
}
