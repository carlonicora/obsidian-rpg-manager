import {AbstractHeaderView} from "../../../managers/viewsManager/abstracts/AbstractHeaderView";
import {NewHeaderViewInterface} from "../../../managers/viewsManager/interfaces/NewHeaderViewInterface";
import {EventInterface} from "../interfaces/EventInterface";

export class EventHeaderView extends AbstractHeaderView implements NewHeaderViewInterface {
	public model: EventInterface;

	public render(
	): void {

	}
}
