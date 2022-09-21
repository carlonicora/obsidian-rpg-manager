import {CampaignSetting} from "../../enums/CampaignSetting";
import {ResponseType} from "../../enums/ResponseType";
import {ViewInterface} from "../ViewInterface";
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
