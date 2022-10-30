import {ElementDataInterface} from "../../../../../managers/viewsManager/interfaces/ElementDataInterface";
import {DateInterface} from "../../../interfaces/DateInterface";

export interface DateElementDataInterface extends ElementDataInterface {
	values: DateInterface|undefined;
}
