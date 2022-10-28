import {AbstractHeaderView} from "../../../managers/viewsManager/abstracts/AbstractHeaderView";
import {NewHeaderViewInterface} from "../../../managers/viewsManager/interfaces/NewHeaderViewInterface";
import {LocationInterface} from "../interfaces/LocationInterface";

export class LocationHeaderView extends AbstractHeaderView implements NewHeaderViewInterface {
	public model: LocationInterface;

	public render(
	): void {

	}
}
