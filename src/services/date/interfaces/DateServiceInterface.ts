import {ComponentModelInterface} from "../../../api/componentManager/interfaces/ComponentModelInterface";
import {DateInterface} from "./DateInterface";
import {FantasyCalendarDateInterface} from "../../fantasyCalendar/interfaces/FantasyCalendarDateInterface";
import {DatabaseInterface} from "../../../database/interfaces/DatabaseInterface";

export interface DateServiceInterface {
	getDate(
		metadataDate: string|undefined,
		frontmatterDate: FantasyCalendarDateInterface|undefined,
		component: ComponentModelInterface,
	): DateInterface|undefined;

	getReadableDate(
		date: DateInterface|undefined,
		component: ComponentModelInterface,
	): string;

	getAge(
		dob: DateInterface|undefined,
		death: DateInterface|undefined,
		currentDate: DateInterface|undefined,
		component: ComponentModelInterface,
	): number|undefined;
}
