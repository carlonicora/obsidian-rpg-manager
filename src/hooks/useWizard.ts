import React from "react";
import { WizardContext } from "src/contexts/WizardContext";

export const useWizard = (): any | undefined => {
	return React.useContext(WizardContext);
};
