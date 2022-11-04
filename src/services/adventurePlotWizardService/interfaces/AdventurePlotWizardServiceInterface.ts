import {IdInterface} from "../../idService/interfaces/IdInterface";

export interface AdventurePlotWizardServiceInterface {
	open(
		adventureId: IdInterface,
	): Promise<void>;
}
