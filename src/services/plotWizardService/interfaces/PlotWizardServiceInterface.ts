import {IndexInterface} from "../../indexService/interfaces/IndexInterface";

export interface PlotWizardServiceInterface {
	openAdventureWizard(
		adventureId: IndexInterface,
	): Promise<void>;

	openActWizard(
		actId: IndexInterface,
	): Promise<void>;
}
