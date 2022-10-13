import {RelationshipListInterface} from "./interfaces/RelationshipListInterface";
import {RelationshipInterface} from "./interfaces/RelationshipInterface";
import {ComponentInterface} from "../components/interfaces/ComponentInterface";
import {RelationshipType} from "./enums/RelationshipType";
import {Md5} from "ts-md5";

export class RelationshipList implements RelationshipListInterface {
	public relationships: Array<RelationshipInterface> = [];

	private _getIndexOfExistingRelationship(
		path: string,
	): number {
		for (let index=0; index<this.relationships.length; index++){
			if (this.relationships[index].path === path){
				return index;
			}
		}

		return -1;
	}

	public existsAlready(
		component: ComponentInterface,
	): boolean {
		return this.getByPath(component.file.path) !== undefined;
	}

	public add(
		relationship: RelationshipInterface,
		checkExistence = true,
	): void {
		const indexOfExistingRelationship = this._getIndexOfExistingRelationship(relationship.path);

		if (!checkExistence) {
			if (indexOfExistingRelationship !== -1) this.relationships.splice(indexOfExistingRelationship, 1);
			this.relationships.push(relationship);
			return;
		}

		let existingRelationship: RelationshipInterface|undefined = undefined;
		if (indexOfExistingRelationship !== -1) existingRelationship = this.getByPath(relationship.path);

		if (indexOfExistingRelationship !== -1 && existingRelationship !== undefined) {
			if (
				(relationship.type !== RelationshipType.Reversed && existingRelationship?.type === RelationshipType.Reversed) ||
				(relationship.type === existingRelationship.type)
			){
				if (indexOfExistingRelationship !== -1) this.relationships.splice(indexOfExistingRelationship, 1);
				this.relationships.push(relationship);
				return;
			}
		} else {
			this.relationships.push(relationship);
		}
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

	get stringified(): Array<any> {
		const response: Array<any> = [];

		for (let index=0; index<this.relationships.length; index++){
			const relationship = this.relationships[index];
			response.push({
				path: relationship.path,
				description: relationship.description,
				type: relationship.type.toString(),
				isInContent: relationship.isInContent.valueOf(),
				componentVersion: relationship.component !== undefined ? relationship.component.version : 0
			})
		}

		return response;
	}

	public md5(): string|Int32Array|undefined {
		const md5 = new Md5();
		md5.appendStr(JSON.stringify(this.stringified));
		return md5.end();
	}
}
