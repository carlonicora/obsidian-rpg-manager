import {HeaderResponseType} from "../../../enums/HeaderResponseType";
import {ContentInterface} from "../../ContentInterface";
import {ComponentV2Interface} from "../../../_dbV2/interfaces/ComponentV2Interface";

export interface HeaderResponseElementInterface {
	currentElement: ComponentV2Interface;
	title: string;
	value: ContentInterface;
	type:HeaderResponseType;
	additionalInformation?: any|undefined,
}
