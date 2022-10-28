import {AbstractHeaderView} from "../../../managers/viewsManager/abstracts/AbstractHeaderView";
import {NewHeaderViewInterface} from "../../../managers/viewsManager/interfaces/NewHeaderViewInterface";
import {CampaignInterface} from "../interfaces/CampaignInterface";

export class CampaignHeaderView extends AbstractHeaderView implements NewHeaderViewInterface {
	public model: CampaignInterface;

	public render(
	): void {

	}
}
