import {CampaignSetting} from "../../../../src/components/campaign/enums/CampaignSetting";
import {ResponseType} from "../../../responses/enums/ResponseType";
import {OldViewInterface} from "../../interfaces/OldViewInterface";
import {ViewType} from "../../enums/ViewType";

export interface ViewFactoryInterface {
	create(
		settings: CampaignSetting,
		type: ResponseType,
		sourcePath: string,
	): OldViewInterface;

	showObsidianView(
		viewType: ViewType,
		params?: any[],
	): Promise<void>;
}
