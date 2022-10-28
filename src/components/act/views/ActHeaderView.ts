import {AbstractHeaderView} from "../../../managers/viewsManager/abstracts/AbstractHeaderView";
import {NewHeaderViewInterface} from "../../../managers/viewsManager/interfaces/NewHeaderViewInterface";
import {ActInterface} from "../interfaces/ActInterface";

export class ActHeaderView extends AbstractHeaderView implements NewHeaderViewInterface {
	public model:ActInterface;

	public render(
	): void {

	}
}
