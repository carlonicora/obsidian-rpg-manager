import {ModelInterface} from "../../api/modelsManager/interfaces/ModelInterface";
import {RelationshipInterface} from "../../services/relationshipsService/interfaces/RelationshipInterface";
import {ContentInterface} from "../contents/interfaces/ContentInterface";

export interface TableResponseElementInterface {
	component?: ModelInterface;
	relationship: RelationshipInterface;
	elements: ContentInterface[];

	addElement(
		content: ContentInterface,
	): void;
}
