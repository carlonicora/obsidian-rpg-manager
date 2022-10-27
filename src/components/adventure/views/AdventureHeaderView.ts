import {NewAbstractHeaderView} from "../../../managers/viewsManager/abstracts/NewAbstractHeaderView";
import {NewHeaderViewInterface} from "../../../managers/viewsManager/interfaces/NewHeaderViewInterface";
import {AdventureInterface} from "../interfaces/AdventureInterface";

export class AdventureHeaderView extends NewAbstractHeaderView implements NewHeaderViewInterface {
	public model: AdventureInterface;

	public render(
	): void {

	}
}
