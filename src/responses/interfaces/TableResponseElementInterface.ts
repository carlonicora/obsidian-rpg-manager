import {ComponentInterface} from "../../components/interfaces/ComponentInterface";
import {RelationshipInterface} from "../../relationships/interfaces/RelationshipInterface";
import {ContentInterface} from "../contents/interfaces/ContentInterface";

export interface TableResponseElementInterface {
	component?: ComponentInterface;
	relationship: RelationshipInterface;
	elements: Array<ContentInterface>;

	addElement(
		content: ContentInterface,
	): void;
}
