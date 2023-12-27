import { App, TFile } from "obsidian";
import { RelationshipLocation } from "src/enums/RelationshipLocation";
import { RelationshipType } from "src/enums/RelationshipType";
import { RelationshipFactory } from "src/factories/RelationshipFactory";
import { RPGManager } from "src/interfaces/RPGManager";
import { Relationship } from "src/interfaces/Relationship";
import { RelationshipData } from "src/interfaces/RelationshipData";
import { Service } from "src/interfaces/Service";
import { FileRelationship } from "./FileRelationshipsService";

export class RelationshipsService implements Service {
	constructor(private _app: App, private _api: RPGManager, private _file: TFile) {}

	async initialise(): Promise<void> {}

	createOrUpdateRelationshipsFromFileRelationships(
		relationships: Relationship[],
		fileRelationships: FileRelationship[]
	): boolean {
		let response: boolean = false;

		if (fileRelationships.length === 0) {
			relationships.forEach((relationship: Relationship) => {
				if (relationship.from.path === this._file.path || relationship.to.path === this._file.path) {
					if (relationship.from.path === this._file.path) {
						if (
							!relationship.fromContainsLocation(RelationshipLocation.Attributes) &&
							!relationship.fromContainsLocation(RelationshipLocation.Metadata)
						) {
							relationships.splice(relationships.indexOf(relationship), 1);
							response = true;
						}
					} else {
						if (
							!relationship.toContainsLocation(RelationshipLocation.Attributes) &&
							!relationship.toContainsLocation(RelationshipLocation.Metadata)
						) {
							relationships.splice(relationships.indexOf(relationship), 1);
							response = true;
						}
					}
				}
			});
		} else {
			fileRelationships.forEach((fileRelationship: FileRelationship) => {
				if (this.createOrUpdateRelationshipsFromFileRelationship(relationships, fileRelationship)) response = true;
			});
		}

		return response;
	}

	createOrUpdateRelationshipsFromFileRelationship(
		relationships: Relationship[],
		fileRelationship: FileRelationship
	): boolean {
		const existingRelationship: Relationship | undefined = relationships.find(
			(relationship: Relationship) =>
				(relationship.from.path === this._file.path && relationship.to.path === fileRelationship.path) ||
				(relationship.to.path === this._file.path && relationship.from.path === fileRelationship.path)
		);

		if (existingRelationship) {
			if (existingRelationship.to.path === this._file.path) {
				if (existingRelationship.toContainsLocation(fileRelationship.location)) return false;
				existingRelationship.data.toLocation |= fileRelationship.location;
			} else {
				if (existingRelationship.fromContainsLocation(fileRelationship.location)) return false;
				existingRelationship.data.fromLocation |= fileRelationship.location;
			}
			return true;
		}

		const from = this._api.getByPath(this._file.path);
		const to = this._api.getByPath(fileRelationship.path);

		if (from && to) {
			const newRelationshipData: RelationshipData = {
				from: from.id,
				fromLocation: fileRelationship.location,
				to: to.id,
				toLocation: 0,
				type: RelationshipType.Bidirectional,
			};
			const newRelationship: Relationship = RelationshipFactory.create(newRelationshipData, this._api);
			relationships.push(newRelationship);
			return true;
		}

		return false;
	}

	// createMissingHiddenRelationshipsFromDatabase(
	// 	hiddenRelationships: FileRelationship[],
	// 	relationships: Relationship[]
	// ): boolean {
	// 	let response: boolean = false;

	// 	if (relationships.length === 0) {
	// 		if (hiddenRelationships.length === 0) return false;

	// 		hiddenRelationships = [];
	// 		return true;
	// 	}

	// 	relationships.forEach((relationship: Relationship) => {
	// 		if (relationship.from.path !== this._file.path && relationship.to.path !== this._file.path) return;

	// 		const isHiddenRelationship: boolean =
	// 			relationship.from.path === this._file.path
	// 				? !relationship.fromContainsLocation(RelationshipLocation.Attributes) &&
	// 				  !relationship.fromContainsLocation(RelationshipLocation.Content)
	// 				: !relationship.toContainsLocation(RelationshipLocation.Attributes) &&
	// 				  !relationship.toContainsLocation(RelationshipLocation.Content);

	// 		if (!isHiddenRelationship) return;

	// 		const relatedPath: string =
	// 			relationship.from.path === this._file.path ? relationship.to.path : relationship.from.path;

	// 		if (hiddenRelationships.find((hiddenRelationship: FileRelationship) => hiddenRelationship.path === relatedPath))
	// 			return;

	// 		hiddenRelationships.push({ path: relatedPath, location: RelationshipLocation.Content });
	// 		response = true;
	// 	});

	// 	return response;
	// }

	// removeMissingHiddenRelationshipsFromDatabase(
	// 	hiddenRelationships: FileRelationship[],
	// 	relationships: Relationship[]
	// ): boolean {
	// 	let response: boolean = false;

	// 	hiddenRelationships.forEach((hiddenRelationship: FileRelationship) => {
	// 		if (
	// 			relationships.find(
	// 				(relationship: Relationship) =>
	// 					relationship.from.path === hiddenRelationship.path || relationship.to.path === hiddenRelationship.path
	// 			)
	// 		)
	// 			return;

	// 		hiddenRelationships.splice(hiddenRelationships.indexOf(hiddenRelationship), 1);
	// 		response = true;
	// 	});

	// 	return response;
	// }
}
