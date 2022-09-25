import {HeaderResponseType} from "../../enums/HeaderResponseType";
import {ContentInterface} from "../ContentInterface";
import {RecordInterface} from "../database/RecordInterface";

export interface HeaderResponseElementInterface {
	currentElement: RecordInterface;
	title: string;
	value: ContentInterface;
	type:HeaderResponseType;
	additionalInformation?: any|undefined,
}
