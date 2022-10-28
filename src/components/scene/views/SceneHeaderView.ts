import {AbstractHeaderView} from "../../../managers/viewsManager/abstracts/AbstractHeaderView";
import {NewHeaderViewInterface} from "../../../managers/viewsManager/interfaces/NewHeaderViewInterface";
import {SceneInterface} from "../interfaces/SceneInterface";

export class SceneHeaderView extends AbstractHeaderView implements NewHeaderViewInterface {
	public model: SceneInterface;

	public render(
	): void {

	}
}
