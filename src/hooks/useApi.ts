import React from "react";
import { RPGManager } from "src/interfaces/RPGManager";
import { ApiContext } from "../contexts/ApiContext";

export const useApi = (): RPGManager | undefined => {
	return React.useContext(ApiContext);
};
