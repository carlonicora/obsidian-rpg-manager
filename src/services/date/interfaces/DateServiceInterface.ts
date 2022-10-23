import {ComponentInterface} from "../../../components/interfaces/ComponentInterface";
import {DateInterface} from "./DateInterface";
import {FantasyCalendarDateInterface} from "../../fantasyCalendar/interfaces/FantasyCalendarDateInterface";

export interface DateServiceInterface {
	getDate(
		metadataDate: string|undefined,
		frontmatterDate: FantasyCalendarDateInterface|undefined,
		component: ComponentInterface,
	): DateInterface|undefined;
}
