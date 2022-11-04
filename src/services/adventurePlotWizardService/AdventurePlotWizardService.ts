import {AbstractService} from "../../managers/servicesManager/abstracts/AbstractService";
import {AdventurePlotWizardServiceInterface} from "./interfaces/AdventurePlotWizardServiceInterface";
import {ServiceInterface} from "../../managers/servicesManager/interfaces/ServiceInterface";
import {IdInterface} from "../idService/interfaces/IdInterface";
import {AdventurePlotWizard} from "./modals/AdventurePlotWizard";

export class AdventurePlotWizardService extends AbstractService implements AdventurePlotWizardServiceInterface, ServiceInterface {
	public async open(
		adventureId: IdInterface,
	): Promise<void> {
		new AdventurePlotWizard(this.api, adventureId).open();
	}
}
