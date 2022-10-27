import {NewAbstractHeaderView} from "../../../managers/viewsManager/abstracts/NewAbstractHeaderView";
import {NewHeaderViewInterface} from "../../../managers/viewsManager/interfaces/NewHeaderViewInterface";
import {CampaignInterface} from "../interfaces/CampaignInterface";

export class CampaignHeaderView extends NewAbstractHeaderView implements NewHeaderViewInterface {
	public model: CampaignInterface;

	public render(
	): void {

	}
}
