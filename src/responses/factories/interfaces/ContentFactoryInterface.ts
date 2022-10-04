import {ContentType} from "../../enums/ContentType";
import {ContentInterface} from "../../contents/interfaces/ContentInterface";

export interface ContentFactoryInterface {
	create(
		content: any,
		type: ContentType,
		isInline?: boolean,
		additionalInformation?: any|undefined,
	): ContentInterface;
}
