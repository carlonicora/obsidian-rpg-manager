import {ComponentInterface} from "../../../components/interfaces/ComponentInterface";
import {DateInterface} from "./DateInterface";
import {FantasyCalendarDateInterface} from "../../fantasyCalendar/interfaces/FantasyCalendarDateInterface";
import {DatabaseInterface} from "../../../databases/interfaces/DatabaseInterface";

export interface DateServiceInterface {
	getDate(
		metadataDate: string|undefined,
		frontmatterDate: FantasyCalendarDateInterface|undefined,
		component: ComponentInterface,
	): DateInterface|undefined;

	getReadableDate(
		date: DateInterface|undefined,
		component: ComponentInterface,
	): string;

	getAge(
		dob: DateInterface|undefined,
		death: DateInterface|undefined,
		currentDate: DateInterface|undefined,
		component: ComponentInterface,
	): number|undefined;
}
