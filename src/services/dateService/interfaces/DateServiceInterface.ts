import {ModelInterface} from "../../../managers/modelsManager/interfaces/ModelInterface";
import {DateInterface} from "./DateInterface";
import {FantasyCalendarCategory} from "../../fantasyCalendarService/enums/FantasyCalendarCategory";

export interface DateServiceInterface {
	getDate(
		metadataDate: string|undefined,
		fantasyCalendarCategory: FantasyCalendarCategory|undefined,
		component: ModelInterface,
	): DateInterface|undefined;

	getReadableDate(
		date: DateInterface|undefined,
		component: ModelInterface,
	): string;

	getAge(
		dob: DateInterface|undefined,
		death: DateInterface|undefined,
		currentDate: DateInterface|undefined,
		component: ModelInterface,
	): number|undefined;

	formatMinutesSeconds(
		durationInSeconds?: number,
	): string;
}
