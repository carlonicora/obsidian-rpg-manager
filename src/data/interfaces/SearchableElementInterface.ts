import { ElementType } from "../enums/ElementType";
import { ImageInterface } from "./ImageInterface";

export interface SearchableElementInterface {
  name: string;
  id: string;
  type: ElementType;
  alias?: string;
  image?: ImageInterface;
  campaignName?: string;
}
