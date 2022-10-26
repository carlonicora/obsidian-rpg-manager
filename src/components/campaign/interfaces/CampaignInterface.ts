import {ModelInterface} from "../../../api/modelsManager/interfaces/ModelInterface";
import {PlotAbtInterface} from "../../../services/plots/interfaces/PlotAbtInterface";
import {CampaignDataInterface} from "./CampaignDataInterface";

export interface CampaignInterface extends ModelInterface, PlotAbtInterface, CampaignDataInterface {
	get folder(): string;
}
