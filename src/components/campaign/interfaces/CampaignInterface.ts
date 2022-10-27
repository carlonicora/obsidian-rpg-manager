import {ModelInterface} from "../../../managers/modelsManager/interfaces/ModelInterface";
import {PlotAbtInterface} from "../../../services/plotsServices/interfaces/PlotAbtInterface";
import {CampaignDataInterface} from "./CampaignDataInterface";

export interface CampaignInterface extends ModelInterface, PlotAbtInterface, CampaignDataInterface {
	get folder(): string;
}
