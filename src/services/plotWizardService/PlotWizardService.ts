import {AbstractService} from "../../managers/servicesManager/abstracts/AbstractService";
import {PlotWizardServiceInterface} from "./interfaces/PlotWizardServiceInterface";
import {ServiceInterface} from "../../managers/servicesManager/interfaces/ServiceInterface";
import {IdInterface} from "../idService/interfaces/IdInterface";
import {AdventurePlotWizard} from "./modals/AdventurePlotWizard";
import {ActPlotWizard} from "./modals/ActPlotWizard";

export class PlotWizardService extends AbstractService implements PlotWizardServiceInterface, ServiceInterface {
	public async openActWizard(
		actId: IdInterface,
	): Promise<void> {
		new ActPlotWizard(this.api, actId).open();
	}

	public async openAdventureWizard(
		adventureId: IdInterface,
	): Promise<void> {
		new AdventurePlotWizard(this.api, adventureId).open();
	}
}
