import * as React from "react";
import { RpgManagerInterface } from "src/RpgManagerInterface";

export const ApiContext = React.createContext<RpgManagerInterface | undefined>(undefined);
