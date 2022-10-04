import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseDataInterface} from "../responses/interfaces/ResponseDataInterface";
import {ControllerMetadataModelListsInterface} from "../metadatas/controllers/ControllerMetadataModelListsInterface";
import {
	ControllerMetadataModelElementInterface
} from "../metadatas/controllers/ControllerMetadataModelElementInterface";
import {RelationshipType} from "../relationships/enums/RelationshipType";
import {ComponentInterface} from "../databases/interfaces/ComponentInterface";
import {ComponentType} from "../databases/enums/ComponentType";
import {SceneInterface} from "../databases/components/interfaces/SceneInterface";
import {SorterComparisonElement} from "../databases/SorterComparisonElement";
import {RelationshipInterface} from "../relationships/interfaces/RelationshipInterface";
import {Relationship} from "../relationships/Relationship";
import {ComponentStage} from "../databases/components/enums/ComponentStage";

export class ListModel extends AbstractModel {
	protected sourceMeta: ControllerMetadataModelListsInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		if (this.currentElement.id.type === ComponentType.Session)this.updateRelationshipsList();
		for (let listCounter=0; listCounter<Object.keys(this.sourceMeta).length; listCounter++){
			const name = Object.keys(this.sourceMeta)[listCounter];
			const componentType = this.factories.componentType.createComponentType(name.slice(0, -1));
			let elements: ControllerMetadataModelElementInterface|Array<ControllerMetadataModelElementInterface>|undefined = this.sourceMeta[name as keyof ControllerMetadataModelListsInterface];

			if (!Array.isArray(elements)) elements = [<ControllerMetadataModelElementInterface>elements];

			for (let elementCount=0; elementCount<elements.length; elementCount++) {
				const element = elements[elementCount];

				if (element !== undefined) {
					const relationshipType = ((element.relationship != null) ? this.factories.relationshipType.createRelationshipType(element.relationship) : undefined);
					if (relationshipType === RelationshipType.Hierarchy) {
						await this.addList(
							componentType,
							this.generateComponentList(componentType),
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

	private generateComponentList(
		type: ComponentType,
	): Array<ComponentInterface> {
		if (this.currentElement.id.type !== ComponentType.Session) return this.database.readList<ComponentInterface>(type, this.currentElement.id)

		return this.database.read<ComponentInterface>(
			(scene: SceneInterface) =>
				scene.id.type === ComponentType.Scene &&
				scene.id.campaignId === this.currentElement.campaign.id.campaignId &&
				scene.id.sessionId === this.currentElement.id.sessionId,
		).sort(this.factories.sorter.create<SceneInterface>([
			new SorterComparisonElement((scene: SceneInterface) => scene.id.adventureId),
			new SorterComparisonElement((scene: SceneInterface) => scene.id.actId),
			new SorterComparisonElement((scene: SceneInterface) => scene.id.sceneId),
		]));
	}

	private updateRelationshipsList(
	): void {
		if (this.currentElement.id.type === ComponentType.Session) {
			const scenes = this.database.read<SceneInterface>(
				(scene: SceneInterface) =>
					scene.id.type === ComponentType.Scene &&
					scene.id.campaignId === this.currentElement.campaign.id.campaignId &&
					scene.session?.id.sessionId === this.currentElement.id.sessionId,
			).sort(this.factories.sorter.create<SceneInterface>([
				new SorterComparisonElement((scene: SceneInterface) => scene.id.adventureId),
				new SorterComparisonElement((scene: SceneInterface) => scene.id.actId),
				new SorterComparisonElement((scene: SceneInterface) => scene.id.sceneId),
			]));

			for (let sceneIndex=0; sceneIndex<scenes.length; sceneIndex++){
				scenes[sceneIndex].getRelationships().forEach((relationship: RelationshipInterface) => {
					if (relationship.component !== undefined && (relationship.component.stage === ComponentStage.Plot || relationship.component.stage === ComponentStage.Run)) return undefined;

					if (this.currentElement.getRelationships().filter((internalRelationship: RelationshipInterface) => internalRelationship.path === relationship.path).length === 0) {
						if (relationship.type === RelationshipType.Biunivocal) {
							this.currentElement.addRelationship(
								new Relationship(RelationshipType.Reversed, relationship.path, undefined, relationship.component)
							);
						}
					}
				});
			}
		}
	}
}
