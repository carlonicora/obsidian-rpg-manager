import React from "react";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import { ApiContext } from "../contexts/ApiContext";

export const useApi = (): RpgManagerInterface | undefined => {
	return React.useContext(ApiContext);
};
