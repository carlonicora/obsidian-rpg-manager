import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {
	ControllerMetadataModelListsInterface
} from "../database/interfaces/metadata/ControllerMetadataModelListsInterface";
import {
	ControllerMetadataModelElementInterface
} from "../database/interfaces/metadata/ControllerMetadataModelElementInterface";
import {RelationshipType} from "../database/relationships/enums/RelationshipType";
import {ComponentInterface} from "../database/interfaces/ComponentInterface";

export class ListModel extends AbstractModel {
	protected sourceMeta: ControllerMetadataModelListsInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		for (let listCounter=0; listCounter<Object.keys(this.sourceMeta).length; listCounter++){
			const name = Object.keys(this.sourceMeta)[listCounter];
			const componentType = this.factories.componentType.createComponentType(name.slice(0, -1));
			let elements: ControllerMetadataModelElementInterface|Array<ControllerMetadataModelElementInterface>|undefined = this.sourceMeta[name as keyof ControllerMetadataModelListsInterface];

			if (!Array.isArray(elements)) elements = [<ControllerMetadataModelElementInterface>elements];

			for (let elementCount=0; elementCount<elements.length; elementCount++) {
				const element = elements[elementCount];

				if (element !== undefined) {
					const relationshipType = ((element.relationship !== undefined) ? this.factories.relationshipType.createRelationshipType(element.relationship) : RelationshipType.Biunivocal);

					if (relationshipType === RelationshipType.Hierarchy) {
						await this.addList(
							componentType,
							this.database.readList<ComponentInterface>(componentType, this.currentElement.id),
						);
					} else {
						await this.addRelationships(
							componentType,
							relationshipType,
							(element.title === '' ? undefined : element.title),
						);
					}
				}
			}
		}

		return this.response;
	}
}
