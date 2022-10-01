import {AbstractModel} from "../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../interfaces/response/ResponseDataInterface";
import {ComponentType} from "../../enums/ComponentType";
import {SorterComparisonElement} from "../../database/SorterComparisonElement";
import {SessionV2Interface} from "../../_dbV2/components/interfaces/SessionV2Interface";
import {SceneV2Interface} from "../../_dbV2/components/interfaces/SceneV2Interface";
import {ComponentV2Interface} from "../../_dbV2/interfaces/ComponentV2Interface";
import {RelationshipV2Interface} from "../../_dbV2/relationships/interfaces/RelationshipV2Interface";
import {RelationshipV2Type} from "../../_dbV2/relationships/enums/RelationshipV2Type";
import {RelationshipV2} from "../../_dbV2/relationships/RelationshipV2";

export class SessionModel extends AbstractModel {
	protected currentElement: SessionV2Interface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		const scenes = await this.database.read<SceneV2Interface>(
			(scene: SceneV2Interface) =>
				scene.id.type === ComponentType.Scene &&
				scene.id.campaignId === this.currentElement.campaign.id.campaignId &&
				scene.session?.id.sessionId === this.currentElement.id.sessionId,
			).sort(this.factories.sorter.create<SceneV2Interface>([
				new SorterComparisonElement((scene: SceneV2Interface) => scene.id.adventureId),
				new SorterComparisonElement((scene: SceneV2Interface) => scene.id.actId),
				new SorterComparisonElement((scene: SceneV2Interface) => scene.id.sceneId),
			]));

		for (let sceneIndex=0; sceneIndex<scenes.length; sceneIndex++){
			await scenes[sceneIndex].relationships.forEach((relationship: RelationshipV2Interface) => {
				if (this.currentElement.relationships.filter((internalRelationship: RelationshipV2Interface) => internalRelationship.path === relationship.path).length === 0)
					this.currentElement.addRelationship(
						new RelationshipV2(RelationshipV2Type.Reversed, relationship.path, undefined, relationship.component)
					);
			});
		}

		await this.addRelationships(ComponentType.Subplot, RelationshipV2Type.Reversed);
		await this.addRelationships(ComponentType.Music);
		await this.addRelationships(ComponentType.Character);
		await this.addRelationships(ComponentType.NonPlayerCharacter);
		await this.addRelationships(ComponentType.Faction);
		await this.addRelationships(ComponentType.Clue);
		await this.addRelationships(ComponentType.Location);
		await this.addRelationships(ComponentType.Event);

		return this.response;
	}

	private addSubplotRelationships(
		component: ComponentV2Interface,
	): void {
		component.relationships.filter((relationship: RelationshipV2Interface) =>
			relationship.component?.id.type === ComponentType.Subplot &&
			relationship.type === RelationshipV2Type.Reversed
		).forEach((relationship: RelationshipV2Interface) => {
			if (this.currentElement.relationships.filter((internalRelationship: RelationshipV2Interface) => internalRelationship.path === relationship.path).length === 0)
				this.currentElement.addRelationship(
					new RelationshipV2(RelationshipV2Type.Reversed, relationship.path, undefined, relationship.component)
				);
		});
	}
}
