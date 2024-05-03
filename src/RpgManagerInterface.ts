import { ElementType } from "src/data/enums/ElementType";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { RpgManagerSettingsInterface } from "./settings/RpgManagerSettings";

export type QueryOptions = {
  id?: string;
  path?: string;
  campaign?: ElementInterface;
  type?: ElementType;
  parent?: ElementInterface;
};

export interface RpgManagerInterface {
  settings: RpgManagerSettingsInterface;
  get version(): string;
  get(query: QueryOptions): ElementInterface | ElementInterface[] | undefined;
}
