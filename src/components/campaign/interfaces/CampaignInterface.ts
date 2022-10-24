import {ComponentModelInterface} from "../../../api/componentManager/interfaces/ComponentModelInterface";
import {PlotAbtInterface} from "../../../services/plots/interfaces/PlotAbtInterface";
import {CampaignDataInterface} from "./CampaignDataInterface";

export interface CampaignInterface extends ComponentModelInterface, PlotAbtInterface, CampaignDataInterface {
	get folder(): string;
}
