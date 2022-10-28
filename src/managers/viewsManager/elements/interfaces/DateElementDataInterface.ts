import {ElementDataInterface} from "../../interfaces/ElementDataInterface";
import {DateInterface} from "../../../../services/dateService/interfaces/DateInterface";

export interface DateElementDataInterface extends ElementDataInterface {
	values: DateInterface|undefined;
}
