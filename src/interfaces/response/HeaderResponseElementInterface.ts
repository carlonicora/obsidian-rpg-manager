import {HeaderResponseType} from "../../enums/HeaderResponseType";
import {ContentInterface} from "../ContentInterface";

export interface HeaderResponseElementInterface {
	title: string;
	value: ContentInterface;
	type:HeaderResponseType;
	additionalInformation?: any|undefined,
}
