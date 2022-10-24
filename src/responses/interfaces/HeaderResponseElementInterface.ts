import {HeaderResponseType} from "../enums/HeaderResponseType";
import {ContentInterface} from "../contents/interfaces/ContentInterface";
import {ComponentModelInterface} from "../../api/componentManager/interfaces/ComponentModelInterface";

export interface HeaderResponseElementInterface {
	currentComponent: ComponentModelInterface;
	title: string;
	value: ContentInterface;
	type:HeaderResponseType;
	additionalInformation?: any|undefined,
}
