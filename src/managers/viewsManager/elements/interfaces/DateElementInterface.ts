import {ElementDataInterface} from "../../interfaces/ElementDataInterface";
import {DateInterface} from "../../../../services/dateService/interfaces/DateInterface";

export interface DateElementInterface extends ElementDataInterface {
	values: DateInterface|undefined;
}
