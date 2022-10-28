import {AbstractHeaderView} from "../../../managers/viewsManager/abstracts/AbstractHeaderView";
import {NewHeaderViewInterface} from "../../../managers/viewsManager/interfaces/NewHeaderViewInterface";
import {FactionInterface} from "../interfaces/FactionInterface";

export class FactionHeaderView extends AbstractHeaderView implements NewHeaderViewInterface {
	public model: FactionInterface;

	public render(
	): void {

	}
}
