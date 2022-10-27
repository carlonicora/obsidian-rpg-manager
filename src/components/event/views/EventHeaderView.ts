import {NewAbstractHeaderView} from "../../../managers/viewsManager/abstracts/NewAbstractHeaderView";
import {NewHeaderViewInterface} from "../../../managers/viewsManager/interfaces/NewHeaderViewInterface";
import {EventInterface} from "../interfaces/EventInterface";

export class EventHeaderView extends NewAbstractHeaderView implements NewHeaderViewInterface {
	public model: EventInterface;

	public render(
	): void {

	}
}
