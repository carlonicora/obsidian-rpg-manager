import {AbstractFactory} from "../abstracts/AbstractFactory";
import {RelationshipTypeFactoryInterface} from "../interfaces/factories/RelationshipTypeFactoryInterface";
import {RelationshipV2Type} from "../_dbV2/relationships/enums/RelationshipV2Type";

export class RelationshipTypeFactory extends AbstractFactory implements RelationshipTypeFactoryInterface {
	private relationshipTypeMap: Map<RelationshipV2Type, string> = new Map<RelationshipV2Type, string>([
		[RelationshipV2Type.Univocal, 'univocal'],
		[RelationshipV2Type.Biunivocal, 'biunivocal'],
		[RelationshipV2Type.Reversed, 'reversed'],
		[RelationshipV2Type.Child, 'child'],
		[RelationshipV2Type.Parent, 'parent'],
		[RelationshipV2Type.Univocal, 'univocal'],
	]);

	createRelationshipType(
		readableRelationshipType: string,
	): RelationshipV2Type {
		let response: RelationshipV2Type|undefined=undefined;
		const typeArray: Array<string> = readableRelationshipType.split('|');

		typeArray.forEach((type: string) => {
			this.relationshipTypeMap.forEach((value: string, type: RelationshipV2Type) => {
				if (value === readableRelationshipType.toLowerCase()) response = (response !== undefined ? response | type : type);
			});
		});

		if (response === undefined) throw new Error('');

		return response;
	}

	createReadableRelationshipType(
		type: RelationshipV2Type,
	): string {
		let response = '';

		Object.keys(RelationshipV2Type).filter((v) => isNaN(Number(v))).forEach((name: string) => {
			const comparisonType = RelationshipV2Type[name as keyof typeof RelationshipV2Type];
			if ((type & comparisonType) === comparisonType) {
				if (this.relationshipTypeMap.has(comparisonType)) {
					response += this.relationshipTypeMap.get(comparisonType) + '|';
				} else {
					response += '|';
				}
			}
		});

		if (response.length === 0) throw new Error('');

		return response.substring(0, response.length - 1);
	}
}
