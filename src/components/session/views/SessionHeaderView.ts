import {AbstractHeaderView} from "../../../managers/viewsManager/abstracts/AbstractHeaderView";
import {NewHeaderViewInterface} from "../../../managers/viewsManager/interfaces/NewHeaderViewInterface";
import {SessionInterface} from "../interfaces/SessionInterface";

export class SessionHeaderView extends AbstractHeaderView implements NewHeaderViewInterface {
	public model: SessionInterface;

	public render(
	): void {

	}
}
