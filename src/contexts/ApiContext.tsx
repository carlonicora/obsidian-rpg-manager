import * as React from "react";
import { RPGManager } from "src/interfaces/RPGManager";

export const ApiContext = React.createContext<RPGManager | undefined>(undefined);
