import {RelationshipInterface} from "./RelationshipInterface";
import {ModelInterface} from "../../../managers/modelsManager/interfaces/ModelInterface";

export interface RelationshipListInterface {
	relationships: RelationshipInterface[];

	existsAlready(
		component: ModelInterface,
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
	): RelationshipInterface[];

	forEach(
		callbackfn: any,
	): void, thisArg?: RelationshipInterface;

	md5(): string|Int32Array|undefined;

	get stringified(): any[];
}
