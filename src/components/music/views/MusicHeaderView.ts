import {AbstractHeaderView} from "../../../managers/viewsManager/abstracts/AbstractHeaderView";
import {NewHeaderViewInterface} from "../../../managers/viewsManager/interfaces/NewHeaderViewInterface";
import {MusicInterface} from "../interfaces/MusicInterface";

export class MusicHeaderView extends AbstractHeaderView implements NewHeaderViewInterface {
	public model: MusicInterface;

	public render(
	): void {

	}
}
