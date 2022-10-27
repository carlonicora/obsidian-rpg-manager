import {NewAbstractHeaderView} from "../../../managers/viewsManager/abstracts/NewAbstractHeaderView";
import {NewHeaderViewInterface} from "../../../managers/viewsManager/interfaces/NewHeaderViewInterface";
import {SessionInterface} from "../interfaces/SessionInterface";

export class SessionHeaderView extends NewAbstractHeaderView implements NewHeaderViewInterface {
	public model: SessionInterface;

	public render(
	): void {

	}
}
