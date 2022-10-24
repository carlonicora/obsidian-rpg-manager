import {NewAbstractHeaderView} from "../../../views/abstracts/NewAbstractHeaderView";
import {NewHeaderViewInterface} from "../../../views/interfaces/NewHeaderViewInterface";
import {ActInterface} from "../../act/interfaces/ActInterface";
import {EventInterface} from "../interfaces/EventInterface";

export class NewEventHeaderView extends NewAbstractHeaderView implements NewHeaderViewInterface {
	public model: EventInterface;

	public render(
	): void {

	}
}
