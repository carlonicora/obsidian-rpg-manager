import {NewAbstractHeaderView} from "../../../views/abstracts/NewAbstractHeaderView";
import {NewHeaderViewInterface} from "../../../views/interfaces/NewHeaderViewInterface";
import {ActInterface} from "../../act/interfaces/ActInterface";
import {CampaignInterface} from "../interfaces/CampaignInterface";

export class NewCampaignHeaderView extends NewAbstractHeaderView implements NewHeaderViewInterface {
	public model: CampaignInterface;

	public render(
	): void {

	}
}
