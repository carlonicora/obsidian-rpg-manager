import {ModelInterface} from "../../../managers/modelsManager/interfaces/ModelInterface";
import {DateInterface} from "./DateInterface";
import {FantasyCalendarDateInterface} from "../../fantasyCalendarService/interfaces/FantasyCalendarDateInterface";

export interface DateServiceInterface {
	getDate(
		metadataDate: string|undefined,
		frontmatterDate: FantasyCalendarDateInterface|undefined,
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

	formatHoursMinutes(
		durationInMinutes?: number,
	): string;


	formatMinutesSeconds(
		durationInSeconds?: number,
	): string;
}
