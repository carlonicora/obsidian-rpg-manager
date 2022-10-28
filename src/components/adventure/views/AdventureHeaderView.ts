import {AbstractHeaderView} from "../../../managers/viewsManager/abstracts/AbstractHeaderView";
import {NewHeaderViewInterface} from "../../../managers/viewsManager/interfaces/NewHeaderViewInterface";
import {AdventureInterface} from "../interfaces/AdventureInterface";

export class AdventureHeaderView extends AbstractHeaderView implements NewHeaderViewInterface {
	public model: AdventureInterface;

	public render(
	): void {

	}
}
