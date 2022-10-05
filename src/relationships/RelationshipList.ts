import {RelationshipListInterface} from "./interfaces/RelationshipListInterface";
import {RelationshipInterface} from "./interfaces/RelationshipInterface";
import {ComponentInterface} from "../databases/interfaces/ComponentInterface";

export class RelationshipList implements RelationshipListInterface {
	private relationships: Array<RelationshipInterface> = [];

	public existsAlready(
		component: ComponentInterface,
	): boolean {
		return this.getByPath(component.file.path) !== undefined;
	}

	public add(
		relationship: RelationshipInterface,
		checkExistence = true,
	): void {
		if (!checkExistence) {
			this.relationships.push(relationship)
			return;
		}

		if (relationship.component !== undefined && !this.existsAlready(relationship.component)) this.relationships.push(relationship);
	}

	public getByPath(
		path: string,
	): RelationshipInterface|undefined {
		const matchingRelationships: Array<RelationshipInterface> =
			this.relationships.filter((searchedRelationship: RelationshipInterface) =>
				searchedRelationship.path === path
			);

		if (matchingRelationships.length !== 1) return undefined;

		return matchingRelationships[0];
	}

	public filter(
		predicate: (value: RelationshipInterface) => boolean, thisArg?: any
	): Array<RelationshipInterface> {
		return this.relationships.filter(predicate);
	}

	public forEach(
		callbackfn: any,
	): void {
		return this.relationships.forEach(callbackfn);
	}
}
