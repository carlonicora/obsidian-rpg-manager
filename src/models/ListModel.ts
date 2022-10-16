import {AbstractModel} from "./abstracts/AbstractModel";
import {ResponseDataInterface} from "../responses/interfaces/ResponseDataInterface";
import {ControllerMetadataModelListsInterface} from "../controller/interfaces/ControllerMetadataModelListsInterface";
import {
	ControllerMetadataModelElementInterface
} from "../controller/interfaces/ControllerMetadataModelElementInterface";
import {RelationshipType} from "../relationships/enums/RelationshipType";
import {ComponentInterface} from "../components/interfaces/ComponentInterface";
import {ComponentType} from "../components/enums/ComponentType";
import {SceneInterface} from "../components/components/scene/interfaces/SceneInterface";
import {SorterComparisonElement} from "../databases/SorterComparisonElement";
import {RelationshipInterface} from "../relationships/interfaces/RelationshipInterface";
import {ComponentStage} from "../components/enums/ComponentStage";

export class ListModel extends AbstractModel {
	protected sourceMeta: ControllerMetadataModelListsInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		if (this.currentComponent.id.type === ComponentType.Session) this._updateRelationshipsList();
		for (let listCounter=0; listCounter<Object.keys(this.sourceMeta).length; listCounter++){
			const name = Object.keys(this.sourceMeta)[listCounter];
			const componentType = this.factories.componentType.createComponentType(name.slice(0, -1));
			let elements: ControllerMetadataModelElementInterface|ControllerMetadataModelElementInterface[]|undefined|null = this.sourceMeta[name as keyof ControllerMetadataModelListsInterface];

			if (elements == undefined) elements = {
				relationship: undefined,
				title: undefined,
			}
			if (!Array.isArray(elements)) elements = [<ControllerMetadataModelElementInterface>elements];

			for (let elementCount=0; elementCount<elements.length; elementCount++) {
				const element = elements[elementCount];

				if (element !== undefined) {
					const relationshipType = ((element.relationship != null) ? this.factories.relationshipType.createRelationshipType(element.relationship) : undefined);

					if (relationshipType === RelationshipType.Hierarchy && (this.currentComponent.id.type !== ComponentType.Session || componentType === ComponentType.Scene)) {
						await this.addList(
							componentType,
							this._generateComponentList(componentType),
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

	private _generateComponentList(
		type: ComponentType,
	): ComponentInterface[] {
		if (this.currentComponent.id.type !== ComponentType.Session) return this.database.readList<ComponentInterface>(type, this.currentComponent.id)

		return this.database.read<ComponentInterface>(
			(scene: SceneInterface) =>
				scene.id.type === ComponentType.Scene &&
				scene.id.campaignId === this.currentComponent.campaign.id.campaignId &&
				scene.session?.id.sessionId === this.currentComponent.id.sessionId,
		).sort(this.factories.sorter.create<SceneInterface>([
			new SorterComparisonElement((scene: SceneInterface) => scene.id.adventureId),
			new SorterComparisonElement((scene: SceneInterface) => scene.id.actId),
			new SorterComparisonElement((scene: SceneInterface) => scene.id.sceneId),
		]));
	}

	private _updateRelationshipsList(
	): void {
		if (this.currentComponent.id.type === ComponentType.Session) {
			const scenes = this.database.read<SceneInterface>(
				(scene: SceneInterface) =>
					scene.id.type === ComponentType.Scene &&
					scene.id.campaignId === this.currentComponent.campaign.id.campaignId &&
					scene.session?.id.sessionId === this.currentComponent.id.sessionId,
			).sort(this.factories.sorter.create<SceneInterface>([
				new SorterComparisonElement((scene: SceneInterface) => scene.id.adventureId),
				new SorterComparisonElement((scene: SceneInterface) => scene.id.actId),
				new SorterComparisonElement((scene: SceneInterface) => scene.id.sceneId),
			]));

			for (let sceneIndex=0; sceneIndex<scenes.length; sceneIndex++){
				scenes[sceneIndex].getRelationships().forEach((relationship: RelationshipInterface) => {
					if (
						relationship.component !== undefined &&
						relationship.component.stage !== ComponentStage.Plot &&
						relationship.component.stage !== ComponentStage.Run &&
						this.currentComponent.getRelationships().filter((internalRelationship: RelationshipInterface) => internalRelationship.path === relationship.path).length === 0 &&
						relationship.type === RelationshipType.Unidirectional
					) {
						this.factories.relationship.create(
							RelationshipType.Hierarchy,
							relationship.path,
							undefined,
							relationship.component,
							false,
							this.currentComponent.getRelationships()
						)
					}
				});
			}
		}
	}
}
