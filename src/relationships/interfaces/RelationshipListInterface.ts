import {RelationshipInterface} from "./RelationshipInterface";
import {ComponentInterface} from "../../databases/interfaces/ComponentInterface";

export interface RelationshipListInterface {
	existsAlready(
		component: ComponentInterface,
	): boolean;

	add(
		relationship: RelationshipInterface,
		checkExistence?: boolean,
	): void;

	getByPath(
		path: string,
	): RelationshipInterface|undefined;

	filter(
		predicate: (value: RelationshipInterface) => boolean, thisArg?: any
	): Array<RelationshipInterface>;

	forEach(
		callbackfn: any,
	): void, thisArg?: RelationshipInterface;
}
