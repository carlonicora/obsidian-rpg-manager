import {ComponentInterface} from "../../interfaces/ComponentInterface";
import {PlotAbtInterface} from "../../../plots/interfaces/PlotAbtInterface";
import {CampaignDataInterface} from "./data/CampaignDataInterface";

export interface CampaignInterface extends ComponentInterface, PlotAbtInterface, CampaignDataInterface {
	get folder(): string;
}
