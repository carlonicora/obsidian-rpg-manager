import {CampaignSetting} from "../../../components/components/campaign/enums/CampaignSetting";
import {ResponseType} from "../../../responses/enums/ResponseType";
import {ViewInterface} from "../../interfaces/ViewInterface";
import {ViewType} from "../../enums/ViewType";

export interface ViewFactoryInterface {
	create(
		settings: CampaignSetting,
		type: ResponseType,
		sourcePath: string,
	): ViewInterface;

	showObsidianView(
		viewType: ViewType,
		params?: Array<any>,
	): Promise<void>;
}
