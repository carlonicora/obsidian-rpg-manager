import { RelationshipLocation } from "src/enums/RelationshipLocation";
import { RelationshipType } from "src/enums/RelationshipType";
import { Element } from "src/interfaces/Element";
import { RPGManager } from "src/interfaces/RPGManager";
import { Relationship } from "src/interfaces/Relationship";
import { RelationshipData } from "src/interfaces/RelationshipData";

export class RpgManagerRelationship implements Relationship {
	constructor(
		public data: RelationshipData,
		private _api: RPGManager,
		private _direct: boolean,
		private _location: RelationshipLocation
	) {}

	get id(): string {
		return this.data.id;
	}

	get from(): Element {
		return this._api.getById(this._direct ? this.data.from : this.data.to);
	}

	get to(): Element {
		return this._api.getById(this._direct ? this.data.to : this.data.from);
	}

	get type(): RelationshipType {
		if (this._direct) return this.data.type;

		switch (this.data.type) {
			case RelationshipType.Bidirectional:
				return RelationshipType.Bidirectional;
			case RelationshipType.Child:
				return RelationshipType.Parent;
			case RelationshipType.Parent:
				return RelationshipType.Child;
			case RelationshipType.Reversed:
				return RelationshipType.Bidirectional;
			case RelationshipType.Unidirectional:
				throw new Error("Unidirectional relationships cannot be reversed.");
		}
	}

	get location(): RelationshipLocation {
		return this._location;
	}

	get description(): string {
		return this._direct ? this.data.descriptionFrom : this.data.descriptionTo;
	}

	addContentRelationships(): void {
		this._location = RelationshipLocation.Both;
	}
}
