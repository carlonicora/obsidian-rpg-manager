import {HeaderResponseType} from "../enums/HeaderResponseType";
import {ContentInterface} from "../contents/interfaces/ContentInterface";
import {ComponentInterface} from "../../databases/interfaces/ComponentInterface";

export interface HeaderResponseElementInterface {
	currentComponent: ComponentInterface;
	title: string;
	value: ContentInterface;
	type:HeaderResponseType;
	additionalInformation?: any|undefined,
}
