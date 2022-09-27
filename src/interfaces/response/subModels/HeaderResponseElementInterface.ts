import {HeaderResponseType} from "../../../enums/HeaderResponseType";
import {ContentInterface} from "../../ContentInterface";
import {ComponentInterface} from "../../database/ComponentInterface";

export interface HeaderResponseElementInterface {
	currentElement: ComponentInterface;
	title: string;
	value: ContentInterface;
	type:HeaderResponseType;
	additionalInformation?: any|undefined,
}
