import {ComponentModelInterface} from "../../api/componentManager/interfaces/ComponentModelInterface";
import {RelationshipInterface} from "../../services/relationships/interfaces/RelationshipInterface";
import {ContentInterface} from "../contents/interfaces/ContentInterface";

export interface TableResponseElementInterface {
	component?: ComponentModelInterface;
	relationship: RelationshipInterface;
	elements: ContentInterface[];

	addElement(
		content: ContentInterface,
	): void;
}
