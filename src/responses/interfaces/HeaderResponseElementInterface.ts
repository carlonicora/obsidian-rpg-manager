import {HeaderResponseType} from "../enums/HeaderResponseType";
import {ContentInterface} from "../contents/interfaces/ContentInterface";
import {ModelInterface} from "../../api/modelsManager/interfaces/ModelInterface";

export interface HeaderResponseElementInterface {
	currentComponent: ModelInterface;
	title: string;
	value: ContentInterface;
	type:HeaderResponseType;
	additionalInformation?: any|undefined,
}
