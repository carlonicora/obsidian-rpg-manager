import {AbstractModel} from "../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../interfaces/response/ResponseDataInterface";
import {ComponentType} from "../../enums/ComponentType";
import {SorterComparisonElement} from "../../database/SorterComparisonElement";
import {SessionInterface} from "../../database/components/interfaces/SessionInterface";
import {SceneInterface} from "../../database/components/interfaces/SceneInterface";
import {ComponentInterface} from "../../database/interfaces/ComponentInterface";
import {RelationshipInterface} from "../../database/relationships/interfaces/RelationshipInterface";
import {RelationshipType} from "../../database/relationships/enums/RelationshipType";
import {Relationship} from "../../database/relationships/Relationship";

export class SessionModel extends AbstractModel {
	protected currentElement: SessionInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		const scenes = await this.database.read<SceneInterface>(
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
			await scenes[sceneIndex].getRelationships().forEach((relationship: RelationshipInterface) => {
				if (this.currentElement.getRelationships().filter((internalRelationship: RelationshipInterface) => internalRelationship.path === relationship.path).length === 0)
					this.currentElement.addRelationship(
						new Relationship(RelationshipType.Reversed, relationship.path, undefined, relationship.component)
					);
			});
		}

		await this.addRelationships(ComponentType.Subplot, RelationshipType.Reversed);
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
		component: ComponentInterface,
	): void {
		component.getRelationships().filter((relationship: RelationshipInterface) =>
			relationship.component?.id.type === ComponentType.Subplot &&
			relationship.type === RelationshipType.Reversed
		).forEach((relationship: RelationshipInterface) => {
			if (this.currentElement.getRelationships().filter((internalRelationship: RelationshipInterface) => internalRelationship.path === relationship.path).length === 0)
				this.currentElement.addRelationship(
					new Relationship(RelationshipType.Reversed, relationship.path, undefined, relationship.component)
				);
		});
	}
}
