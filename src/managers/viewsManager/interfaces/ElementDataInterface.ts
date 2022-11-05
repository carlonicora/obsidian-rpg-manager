import {ModelInterface} from "../../modelsManager/interfaces/ModelInterface";
import {FantasyCalendarCategory} from "../../../services/fantasyCalendarService/enums/FantasyCalendarCategory";

export interface ElementDataInterface {
	model: ModelInterface,
	title: string,
	values: any,
	category?: FantasyCalendarCategory,
	editableKey?: string,
}
