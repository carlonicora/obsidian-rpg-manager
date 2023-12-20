import { App } from "obsidian";
import React from "react";
import { AppContext } from "src/contexts/AppContext";

export const useApp = (): App | undefined => {
	return React.useContext(AppContext);
};
