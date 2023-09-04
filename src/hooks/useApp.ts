import { AppContext } from "@/contexts/AppContext";
import { App } from "obsidian";
import React from "react";

export const useApp = (): App | undefined => {
	return React.useContext(AppContext);
};
