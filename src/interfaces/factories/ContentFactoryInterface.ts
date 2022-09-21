import {ContentType} from "../../enums/ContentType";
import {ContentInterface} from "../ContentInterface";

export interface ContentFactoryInterface {
	create(
		content: any,
		type: ContentType,
		isInline?: boolean,
	): ContentInterface;
}
