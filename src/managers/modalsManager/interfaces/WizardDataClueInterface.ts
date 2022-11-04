import {WizardDataClueLeadInterface} from "./WizardDataClueLeadInterface";

export interface WizardDataClueInterface {
	name: string,
	description: string,
	leads?: WizardDataClueLeadInterface[],
}
