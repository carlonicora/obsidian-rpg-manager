import {AbstractHeaderView} from "../../../managers/viewsManager/abstracts/AbstractHeaderView";
import {NewHeaderViewInterface} from "../../../managers/viewsManager/interfaces/NewHeaderViewInterface";
import {SubplotInterface} from "../interfaces/SubplotInterface";

export class SubplotHeaderView extends AbstractHeaderView implements NewHeaderViewInterface {
	public model: SubplotInterface;

	public render(
	): void {

	}
}
