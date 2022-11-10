import {IdInterface} from "../../idService/interfaces/IdInterface";

export interface PlotWizardServiceInterface {
	openAdventureWizard(
		adventureId: IdInterface,
	): Promise<void>;

	openActWizard(
		actId: IdInterface,
	): Promise<void>;
}
